import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBookedSeats, createBooking, processPayment } from '../services/api';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import './SeatSelection.css';

const SeatSelection = ({ userId }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { route, bus, journeyDate, fromCity, toCity } = location.state || {};
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: 'Male'
  });
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (route && bus) {
      fetchBookedSeats();
    }
  }, [route, bus]);

  const fetchBookedSeats = async () => {
    try {
      const response = await getBookedSeats(bus.id, route.id, journeyDate);
      setBookedSeats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching booked seats:', error);
      setLoading(false);
    }
  };

  const generateSeats = () => {
    const seats = [];
    const rows = bus.rows || 10;
    const seatsPerRow = bus.seatsPerRow || 4;
    const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
    
    for (let row = 1; row <= rows; row++) {
      for (let col = 0; col < seatsPerRow; col++) {
        const seatNumber = `${row}${seatLetters[col]}`;
        seats.push(seatNumber);
      }
    }
    return seats;
  };

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;
    
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const getSeatClass = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return 'seat booked';
    if (selectedSeats.includes(seatNumber)) return 'seat selected';
    return 'seat available';
  };

  const calculateTotalFare = () => {
    return route.baseFare * selectedSeats.length;
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    
    if (!passengerDetails.name || !passengerDetails.email || !passengerDetails.phone) {
      alert('Please fill all passenger details');
      return;
    }

    setProcessing(true);

    try {
      // Create booking
      const bookingData = {
        userId: userId,
        busId: bus.id,
        routeId: route.id,
        passengerDetails: passengerDetails,
        journeyDate: journeyDate,
        fromCity: fromCity,
        toCity: toCity,
        boardingPoint: route.boardingPoints[0],
        droppingPoint: route.droppingPoints[0],
        seatNumbers: selectedSeats,
        numberOfSeats: selectedSeats.length,
        totalFare: calculateTotalFare(),
        paymentStatus: 'PENDING',
        paymentMethod: 'STRIPE'
      };

      const bookingResponse = await createBooking(bookingData);
      
      // Process payment
      const paymentData = {
        bookingId: bookingResponse.data.id,
        amount: calculateTotalFare(),
        paymentMethod: 'stripe',
        email: passengerDetails.email
      };

      const paymentResponse = await processPayment(paymentData);

      if (paymentResponse.data.success) {
        navigate(`/booking-confirmation/${bookingResponse.data.id}`);
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (!route || !bus) {
    return <div className="error">Invalid booking data</div>;
  }

  return (
    <div className="seat-selection">
      <div className="container">
        <div className="bus-header">
          <h2>{bus.busName}</h2>
          <p>{fromCity} → {toCity} | {journeyDate}</p>
        </div>

        <div className="selection-content">
          <div className="seat-layout-section">
            <h3>Select Your Seats</h3>
            
            <div className="seat-legend">
              <div className="legend-item">
                <div className="seat available"></div>
                <span>Available</span>
              </div>
              <div className="legend-item">
                <div className="seat selected"></div>
                <span>Selected</span>
              </div>
              <div className="legend-item">
                <div className="seat booked"></div>
                <span>Booked</span>
              </div>
            </div>

            <div className="seat-grid">
              <div className="driver-section">🚗 Driver</div>
              {generateSeats().map((seatNumber) => (
                <div
                  key={seatNumber}
                  className={getSeatClass(seatNumber)}
                  onClick={() => handleSeatClick(seatNumber)}
                >
                  {seatNumber}
                </div>
              ))}
            </div>
          </div>

          <div className="booking-details">
            <h3>Passenger Details</h3>
            
            <div className="form-group">
              <label><FaUser /> Full Name</label>
              <input
                type="text"
                value={passengerDetails.name}
                onChange={(e) => setPassengerDetails({...passengerDetails, name: e.target.value})}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label><FaEnvelope /> Email</label>
              <input
                type="email"
                value={passengerDetails.email}
                onChange={(e) => setPassengerDetails({...passengerDetails, email: e.target.value})}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label><FaPhone /> Phone</label>
              <input
                type="tel"
                value={passengerDetails.phone}
                onChange={(e) => setPassengerDetails({...passengerDetails, phone: e.target.value})}
                placeholder="+91 9876543210"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  value={passengerDetails.age}
                  onChange={(e) => setPassengerDetails({...passengerDetails, age: e.target.value})}
                  placeholder="Age"
                  min="1"
                  max="120"
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select
                  value={passengerDetails.gender}
                  onChange={(e) => setPassengerDetails({...passengerDetails, gender: e.target.value})}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="fare-summary">
              <h4>Fare Summary</h4>
              <div className="summary-row">
                <span>Selected Seats:</span>
                <span>{selectedSeats.join(', ') || 'None'}</span>
              </div>
              <div className="summary-row">
                <span>Number of Seats:</span>
                <span>{selectedSeats.length}</span>
              </div>
              <div className="summary-row">
                <span>Base Fare:</span>
                <span>₹{route.baseFare}</span>
              </div>
              <div className="summary-row total">
                <span>Total Fare:</span>
                <span>₹{calculateTotalFare()}</span>
              </div>
            </div>

            <button 
              className="btn btn-success book-btn"
              onClick={handleBooking}
              disabled={processing || selectedSeats.length === 0}
            >
              {processing ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;