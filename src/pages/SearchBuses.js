import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchRoutes, getBusById } from '../services/api';
import { FaBus, FaWifi, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import './SearchBuses.css';

const SearchBuses = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchData = location.state;
  
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchData) {
      fetchBuses();
    }
  }, [searchData]);

  const fetchBuses = async () => {
    try {
      const routesResponse = await searchRoutes(searchData.fromCity, searchData.toCity);
      const routesWithBuses = await Promise.all(
        routesResponse.data.map(async (route) => {
          const busResponse = await getBusById(route.busId);
          return { ...route, bus: busResponse.data };
        })
      );
      setBuses(routesWithBuses);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching buses:', error);
      setLoading(false);
    }
  };

  const handleSelectBus = (route) => {
    navigate('/seat-selection', {
      state: {
        route: route,
        bus: route.bus,
        journeyDate: searchData.journeyDate,
        fromCity: searchData.fromCity,
        toCity: searchData.toCity
      }
    });
  };

  if (loading) {
    return <div className="loading">🚌 Searching for buses...</div>;
  }

  if (buses.length === 0) {
    return (
      <div className="no-buses">
        <h2>No buses found</h2>
        <p>Try searching for a different route or date</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Search Again
        </button>
      </div>
    );
  }

  return (
    <div className="search-buses">
      <div className="container">
        <div className="search-header">
          <h1>{searchData.fromCity} → {searchData.toCity}</h1>
          <p>{new Date(searchData.journeyDate).toLocaleDateString('en-US', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
          })}</p>
          <p className="buses-found">{buses.length} buses found</p>
        </div>

        <div className="buses-list">
          {buses.map((route) => (
            <div key={route.id} className="bus-card">
              <div className="bus-image">
                <img src={route.bus.imageUrl || 'https://via.placeholder.com/200x150?text=Bus'} alt={route.bus.busName} />
              </div>
              
              <div className="bus-info">
                <h3>{route.bus.busName}</h3>
                <p className="operator">{route.bus.operatorName}</p>
                <p className="bus-type">{route.bus.busType}</p>
                
                <div className="amenities">
                  {route.bus.amenities?.slice(0, 3).map((amenity, index) => (
                    <span key={index} className="amenity-badge">
                      <FaWifi /> {amenity}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="journey-info">
                <div className="time-info">
                  <div className="time-block">
                    <span className="time">{route.departureTime}</span>
                    <span className="city">{route.fromCity}</span>
                  </div>
                  <div className="duration">
                    <FaClock /> {route.duration}
                  </div>
                  <div className="time-block">
                    <span className="time">{route.arrivalTime}</span>
                    <span className="city">{route.toCity}</span>
                  </div>
                </div>
                
                <div className="boarding-points">
                  <FaMapMarkerAlt /> {route.boardingPoints?.length || 0} Boarding Points
                </div>
              </div>
              
              <div className="booking-section">
                <div className="fare">
                  <span className="label">Starting from</span>
                  <span className="price">₹{route.baseFare}</span>
                </div>
                <div className="seats-available">
                  {route.bus.totalSeats} seats available
                </div>
                <button 
                  className="btn btn-primary select-btn"
                  onClick={() => handleSelectBus(route)}
                >
                  Select Seats
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBuses;