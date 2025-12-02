import React, { useState, useEffect } from 'react';
import { getAllBuses, createBus, updateBus, deleteBus, getAllRoutes, createRoute, getAllBookings } from '../services/api';
import { FaBus, FaRoute, FaTicketAlt, FaPlus } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('buses');
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === 'buses') {
        const response = await getAllBuses();
        setBuses(response.data);
      } else if (activeTab === 'routes') {
        const response = await getAllRoutes();
        setRoutes(response.data);
      } else if (activeTab === 'bookings') {
        const response = await getAllBookings();
        setBookings(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCreateBus = async (e) => {
    e.preventDefault();
    try {
      await createBus({
        ...formData,
        totalSeats: parseInt(formData.totalSeats),
        rows: parseInt(formData.rows),
        seatsPerRow: parseInt(formData.seatsPerRow),
        amenities: formData.amenities?.split(',').map(a => a.trim()) || [],
        isActive: true,
        seatLayout: {
          type: '2x2',
          unavailableSeats: []
        }
      });
      alert('Bus created successfully!');
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Error creating bus:', error);
      alert('Failed to create bus');
    }
  };

  const handleDeleteBus = async (id) => {
    if (window.confirm('Are you sure you want to delete this bus?')) {
      try {
        await deleteBus(id);
        alert('Bus deleted successfully!');
        fetchData();
      } catch (error) {
        console.error('Error deleting bus:', error);
        alert('Failed to delete bus');
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1>Admin Dashboard</h1>

        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'buses' ? 'active' : ''}`}
            onClick={() => setActiveTab('buses')}
          >
            <FaBus /> Buses
          </button>
          <button 
            className={`tab ${activeTab === 'routes' ? 'active' : ''}`}
            onClick={() => setActiveTab('routes')}
          >
            <FaRoute /> Routes
          </button>
          <button 
            className={`tab ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <FaTicketAlt /> Bookings
          </button>
        </div>

        {/* Buses Tab */}
        {activeTab === 'buses' && (
          <div className="tab-content">
            <div className="tab-header">
              <h2>Manage Buses</h2>
              <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                <FaPlus /> Add Bus
              </button>
            </div>

            {showForm && (
              <form className="admin-form" onSubmit={handleCreateBus}>
                <div className="form-grid">
                  <input
                    type="text"
                    placeholder="Bus Number (e.g., MH12AB1234)"
                    onChange={(e) => setFormData({...formData, busNumber: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Bus Name"
                    onChange={(e) => setFormData({...formData, busName: e.target.value})}
                    required
                  />
                  <select onChange={(e) => setFormData({...formData, busType: e.target.value})} required>
                    <option value="">Select Bus Type</option>
                    <option value="AC Sleeper">AC Sleeper</option>
                    <option value="Non-AC Sleeper">Non-AC Sleeper</option>
                    <option value="AC Seater">AC Seater</option>
                    <option value="Non-AC Seater">Non-AC Seater</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Operator Name"
                    onChange={(e) => setFormData({...formData, operatorName: e.target.value})}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Total Seats"
                    onChange={(e) => setFormData({...formData, totalSeats: e.target.value})}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Rows"
                    onChange={(e) => setFormData({...formData, rows: e.target.value})}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Seats Per Row"
                    onChange={(e) => setFormData({...formData, seatsPerRow: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Amenities (comma separated)"
                    onChange={(e) => setFormData({...formData, amenities: e.target.value})}
                  />
                  <input
                    type="url"
                    placeholder="Image URL"
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  />
                </div>
                <button type="submit" className="btn btn-success">Create Bus</button>
              </form>
            )}

            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Bus Number</th>
                    <th>Bus Name</th>
                    <th>Type</th>
                    <th>Operator</th>
                    <th>Seats</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {buses.map((bus) => (
                    <tr key={bus.id}>
                      <td>{bus.busNumber}</td>
                      <td>{bus.busName}</td>
                      <td>{bus.busType}</td>
                      <td>{bus.operatorName}</td>
                      <td>{bus.totalSeats}</td>
                      <td>
                        <span className={`status-badge ${bus.isActive ? 'active' : 'inactive'}`}>
                          {bus.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <button className="btn-small btn-danger" onClick={() => handleDeleteBus(bus.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Routes Tab */}
        {activeTab === 'routes' && (
          <div className="tab-content">
            <h2>Manage Routes</h2>
            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Duration</th>
                    <th>Fare</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {routes.map((route) => (
                    <tr key={route.id}>
                      <td>{route.fromCity}</td>
                      <td>{route.toCity}</td>
                      <td>{route.departureTime}</td>
                      <td>{route.arrivalTime}</td>
                      <td>{route.duration}</td>
                      <td>₹{route.baseFare}</td>
                      <td>
                        <span className={`status-badge ${route.isActive ? 'active' : 'inactive'}`}>
                          {route.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="tab-content">
            <h2>All Bookings</h2>
            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Booking #</th>
                    <th>Passenger</th>
                    <th>Route</th>
                    <th>Date</th>
                    <th>Seats</th>
                    <th>Fare</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.bookingNumber}</td>
                      <td>{booking.passengerDetails.name}</td>
                      <td>{booking.fromCity} → {booking.toCity}</td>
                      <td>{new Date(booking.journeyDate).toLocaleDateString()}</td>
                      <td>{booking.seatNumbers.join(', ')}</td>
                      <td>₹{booking.totalFare}</td>
                      <td>
                        <span className={`status-badge ${booking.status.toLowerCase()}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;