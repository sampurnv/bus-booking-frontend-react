import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaShieldAlt, FaClock, FaMoneyBillWave } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    fromCity: '',
    toCity: '',
    journeyDate: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchData.fromCity && searchData.toCity && searchData.journeyDate) {
      navigate('/search', { state: searchData });
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>🚌 Book Your Bus Tickets Online</h1>
          <p>Fast, Easy, and Secure Bus Booking</p>
          
          {/* Search Form */}
          <form className="search-form" onSubmit={handleSearch}>
            <div className="form-group">
              <label>From</label>
              <input
                type="text"
                placeholder="Enter source city"
                value={searchData.fromCity}
                onChange={(e) => setSearchData({...searchData, fromCity: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>To</label>
              <input
                type="text"
                placeholder="Enter destination city"
                value={searchData.toCity}
                onChange={(e) => setSearchData({...searchData, toCity: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Journey Date</label>
              <input
                type="date"
                value={searchData.journeyDate}
                onChange={(e) => setSearchData({...searchData, journeyDate: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary search-btn">
              <FaSearch /> Search Buses
            </button>
          </form>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><FaShieldAlt /></div>
              <h3>Safe & Secure</h3>
              <p>100% secure payment gateway</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaClock /></div>
              <h3>24/7 Support</h3>
              <p>Round the clock customer service</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaMoneyBillWave /></div>
              <h3>Best Prices</h3>
              <p>Competitive fares guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="popular-routes">
        <div className="container">
          <h2>Popular Routes</h2>
          <div className="routes-grid">
            <div className="route-card">Mumbai → Pune</div>
            <div className="route-card">Delhi → Jaipur</div>
            <div className="route-card">Bangalore → Chennai</div>
            <div className="route-card">Hyderabad → Vijayawada</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;