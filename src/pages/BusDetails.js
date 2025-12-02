import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBusById } from '../services/api';
import './BusDetails.css';

const BusDetails = () => {
  const { busId } = useParams();
  const [bus, setBus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBus();
  }, [busId]);

  const fetchBus = async () => {
    try {
      const response = await getBusById(busId);
      setBus(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bus:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading bus details...</div>;
  }

  if (!bus) {
    return <div className="error">Bus not found</div>;
  }

  return (
    <div className="bus-details">
      <div className="container">
        <div className="details-card">
          <img src={bus.imageUrl || 'https://via.placeholder.com/800x400?text=Bus'} alt={bus.busName} />
          <h1>{bus.busName}</h1>
          <p className="operator">{bus.operatorName}</p>
          <p className="bus-type">{bus.busType}</p>
          
          <div className="amenities-list">
            <h3>Amenities</h3>
            <div className="amenities-grid">
              {bus.amenities?.map((amenity, index) => (
                <div key={index} className="amenity-item">✓ {amenity}</div>
              ))}
            </div>
          </div>

          <div className="bus-specs">
            <div className="spec-item">
              <strong>Total Seats:</strong> {bus.totalSeats}
            </div>
            <div className="spec-item">
              <strong>Seat Layout:</strong> {bus.seatLayout?.type || '2x2'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusDetails;