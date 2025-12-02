import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookingById } from '../services/api';
import { FaCheckCircle, FaBus, FaCalendar, FaTicketAlt } from 'react-icons/fa';
import './BookingConfirmation.css';

const BookingConfirmation = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooking();
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      const response = await getBookingById(bookingId);
      setBooking(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching booking:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading booking details...</div>;
  }

  if (!booking) {
    return <div className="error">Booking not found</div>;
  }

  return (
    <div className="booking-confirmation">
      <div className="container">
        <div className="success-message">
          <FaCheckCircle className="success-icon" />
          <h1>Booking Confirmed!</h1>
          <p>Your ticket has been booked successfully</p>
        </div>

        <div className="confirmation-card">
          <div className="booking-number">
            <FaTicketAlt />
            <div>
              <span className="label">Booking Number</span>
              <span className="value">{booking.bookingNumber}</span>
            </div>
          </div>

          <div className="journey-details">
            <h3>Journey Details</h3>
            
            <div className="detail-grid">
              <div className="detail-item">
                <FaBus />
                <div>
                  <strong>Route</strong>
                  <p>{booking.fromCity} → {booking.toCity}</p>
                </div>
              </div>

              <div className="detail-item">
                <FaCalendar />
                <div>
                  <strong>Journey Date</strong>
                  <p>{new Date(booking.journeyDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
              </div>

              <div className="detail-item">
                <strong>Boarding Point:</strong>
                <p>{booking.boardingPoint}</p>
              </div>

              <div className="detail-item">
                <strong>Dropping Point:</strong>
                <p>{booking.droppingPoint}</p>
              </div>

              <div className="detail-item">
                <strong>Seats:</strong>
                <p className="seats">{booking.seatNumbers.join(', ')}</p>
              </div>

              <div className="detail-item">
                <strong>Total Fare:</strong>
                <p className="fare">₹{booking.totalFare}</p>
              </div>
            </div>
          </div>

          <div className="passenger-details">
            <h3>Passenger Details</h3>
            <p><strong>Name:</strong> {booking.passengerDetails.name}</p>
            <p><strong>Email:</strong> {booking.passengerDetails.email}</p>
            <p><strong>Phone:</strong> {booking.passengerDetails.phone}</p>
          </div>

          <div className="confirmation-note">
            <p>📧 A confirmation email has been sent to {booking.passengerDetails.email}</p>
            <p>Please arrive at the boarding point 15 minutes before departure.</p>
          </div>

          <div className="action-buttons">
            <button className="btn btn-primary" onClick={() => navigate('/my-bookings')}>
              View All Bookings
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/')}>
              Book Another Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;