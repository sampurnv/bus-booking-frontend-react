import React, { useState, useEffect } from 'react';
import { getUserBookings, cancelBooking } from '../services/api';
import { FaBus, FaCalendar, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';
import './MyBookings.css';

const MyBookings = ({ userId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, [userId]);

  const fetchBookings = async () => {
    try {
      const response = await getUserBookings(userId);
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await cancelBooking(bookingId);
        alert('Booking cancelled successfully. Refund will be processed in 3-5 business days.');
        fetchBookings();
      } catch (error) {
        console.error('Error cancelling booking:', error);
        alert('Failed to cancel booking');
      }
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      CONFIRMED: '#28a745',
      CANCELLED: '#dc3545',
      COMPLETED: '#6c757d'
    };
    return colors[status] || '#667eea';
  };

  if (loading) {
    return <div className="loading">Loading your bookings...</div>;
  }

  if (bookings.length === 0) {
    return (
      <div className="no-bookings">
        <FaTicketAlt className="no-bookings-icon" />
        <h2>No bookings yet</h2>
        <p>Book your first bus ticket now!</p>
      </div>
    );
  }

  return (
    <div className="my-bookings">
      <div className="container">
        <h1>My Bookings</h1>

        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <div className="booking-header">
                <div>
                  <h3>
                    <FaTicketAlt /> {booking.bookingNumber}
                  </h3>
                  <p className="booking-date">
                    Booked on {new Date(booking.bookingDate).toLocaleDateString()}
                  </p>
                </div>
                <div 
                  className="booking-status"
                  style={{ backgroundColor: getStatusColor(booking.status) }}
                >
                  {booking.status}
                </div>
              </div>

              <div className="booking-details">
                <div className="detail-row">
                  <FaBus />
                  <div>
                    <strong>Journey</strong>
                    <p>{booking.fromCity} → {booking.toCity}</p>
                  </div>
                </div>

                <div className="detail-row">
                  <FaCalendar />
                  <div>
                    <strong>Journey Date</strong>
                    <p>{new Date(booking.journeyDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="detail-row">
                  <FaMapMarkerAlt />
                  <div>
                    <strong>Boarding Point</strong>
                    <p>{booking.boardingPoint}</p>
                  </div>
                </div>

                <div className="detail-row">
                  <strong>Seats:</strong>
                  <span className="seats-info">{booking.seatNumbers.join(', ')}</span>
                </div>

                <div className="detail-row">
                  <strong>Passenger:</strong>
                  <span>{booking.passengerDetails.name}</span>
                </div>

                <div className="detail-row total-fare">
                  <strong>Total Fare:</strong>
                  <span>₹{booking.totalFare}</span>
                </div>
              </div>

              {booking.status === 'CONFIRMED' && (
                <div className="booking-actions">
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleCancelBooking(booking.id)}
                  >
                    Cancel Booking
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;