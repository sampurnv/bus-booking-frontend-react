import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Bus APIs
export const getAllBuses = () => api.get('/buses');
export const getBusById = (id) => api.get(`/buses/${id}`);
export const getActiveBuses = () => api.get('/buses/active');
export const createBus = (bus) => api.post('/buses', bus);
export const updateBus = (id, bus) => api.put(`/buses/${id}`, bus);
export const deleteBus = (id) => api.delete(`/buses/${id}`);

// Route APIs
export const getAllRoutes = () => api.get('/routes');
export const getRouteById = (id) => api.get(`/routes/${id}`);
export const searchRoutes = (fromCity, toCity) => 
  api.get(`/routes/search?fromCity=${fromCity}&toCity=${toCity}`);
export const createRoute = (route) => api.post('/routes', route);
export const updateRoute = (id, route) => api.put(`/routes/${id}`, route);
export const deleteRoute = (id) => api.delete(`/routes/${id}`);

// Booking APIs
export const getAllBookings = () => api.get('/bookings');
export const getBookingById = (id) => api.get(`/bookings/${id}`);
export const getBookingByNumber = (bookingNumber) => api.get(`/bookings/number/${bookingNumber}`);
export const getUserBookings = (userId) => api.get(`/bookings/user/${userId}`);
export const getBookedSeats = (busId, routeId, journeyDate) => 
  api.get(`/bookings/booked-seats?busId=${busId}&routeId=${routeId}&journeyDate=${journeyDate}`);
export const createBooking = (booking) => api.post('/bookings', booking);
export const updateBooking = (id, booking) => api.put(`/bookings/${id}`, booking);
export const cancelBooking = (id) => api.put(`/bookings/${id}/cancel`);

// Payment APIs
export const processPayment = (paymentData) => api.post('/payments/process', paymentData);

export default api;