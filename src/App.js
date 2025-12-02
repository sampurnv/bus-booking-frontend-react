import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchBuses from './pages/SearchBuses';
import BusDetails from './pages/BusDetails';
import SeatSelection from './pages/SeatSelection';
import BookingConfirmation from './pages/BookingConfirmation';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  const [userId] = useState('user123'); // Simulated logged-in user

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchBuses />} />
          <Route path="/bus/:busId" element={<BusDetails />} />
          <Route path="/seat-selection" element={<SeatSelection userId={userId} />} />
          <Route path="/booking-confirmation/:bookingId" element={<BookingConfirmation />} />
          <Route path="/my-bookings" element={<MyBookings userId={userId} />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;