# 🚌 Bus Booking System - Frontend

Modern bus booking system frontend built with **React.js**.

## ✨ Features

### User Features
- 🏠 **Hero Section** - Beautiful landing page with search
- 🔍 **Bus Search** - Search buses by route and date
- 💺 **Seat Selection** - Interactive seat layout
- 💳 **Payment Integration** - Stripe & Razorpay
- 🎫 **Booking Management** - View and cancel bookings
- 📧 **Email Notifications** - Booking confirmations

### Admin Features
- 🚌 **Bus Management** - CRUD operations
- 🛣️ **Route Management** - Manage routes
- 📊 **Dashboard** - View all bookings

## 🛠️ Tech Stack

- **React 18**
- **React Router DOM 6**
- **Axios** - API calls
- **React Icons** - Icons
- **React DatePicker** - Date selection
- **CSS3** - Modern styling

## 📋 Prerequisites

- Node.js 14+ and npm

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/sampurnv/bus-booking-frontend-react.git
cd bus-booking-frontend-react
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure API Endpoint

The frontend connects to backend at `http://localhost:8080/api`.

If your backend runs on different port, update `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:YOUR_PORT/api';
```

### 4. Start Development Server

```bash
npm start
```

Application opens at: **http://localhost:3000**

## 📱 Pages

### Home Page (`/`)
- Hero section with search form
- Features showcase
- Popular routes

### Search Buses (`/search`)
- List of available buses
- Filter by bus type
- View bus details

### Seat Selection (`/seat-selection`)
- Interactive seat layout
- Real-time seat availability
- Select multiple seats

### Booking Confirmation (`/booking-confirmation/:id`)
- Booking details
- Download ticket
- Email confirmation

### My Bookings (`/my-bookings`)
- View all bookings
- Cancel bookings
- Booking history

### Admin Dashboard (`/admin`)
- Manage buses
- Manage routes
- View all bookings

## 🎨 Features Breakdown

### 1. Hero Section
- Gradient background
- Search form with validation
- Responsive design

### 2. Bus Search
- Search by source and destination
- Date selection
- Real-time availability

### 3. Seat Selection
- Visual seat layout (2x2, 2x3)
- Booked seats marked
- Selected seats highlighted
- Total fare calculation

### 4. Payment Gateway
- Stripe integration
- Razorpay integration
- Secure payment processing
- Payment confirmation

### 5. Booking Management
- View booking details
- Cancel with refund
- Email notifications
- Booking history

## 📦 Project Structure

```
src/
├── components/
│   ├── Navbar.js           # Navigation bar
│   ├── BusCard.js          # Bus display card
│   ├── SeatLayout.js       # Seat selection grid
│   └── PaymentGateway.js   # Payment processing
├── pages/
│   ├── Home.js             # Landing page
│   ├── SearchBuses.js      # Bus search results
│   ├── SeatSelection.js    # Seat booking
│   ├── BookingConfirmation.js  # Confirmation page
│   ├── MyBookings.js       # User bookings
│   └── AdminDashboard.js   # Admin panel
├── services/
│   └── api.js              # API calls
├── App.js                  # Main app component
└── index.js                # Entry point
```

## 🔧 Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 🎯 Key Components

### Navbar
- Responsive navigation
- Links to all pages
- User profile icon

### Search Form
- Source and destination cities
- Journey date picker
- Form validation

### Seat Layout
- Grid-based seat display
- Color-coded seats:
  - 🟢 Available
  - 🔴 Booked
  - 🔵 Selected
- Click to select/deselect

### Payment Gateway
- Multiple payment options
- Card details form
- Secure processing
- Success/failure handling

## 🌐 API Integration

All API calls are in `src/services/api.js`:

```javascript
// Search buses
searchRoutes(fromCity, toCity)

// Get booked seats
getBookedSeats(busId, routeId, journeyDate)

// Create booking
createBooking(bookingData)

// Process payment
processPayment(paymentData)
```

## 🎨 Styling

- Modern gradient designs
- Card-based layouts
- Hover effects
- Responsive breakpoints
- Smooth transitions

## 📱 Responsive Design

Fully responsive for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

Creates optimized build in `build/` folder.

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## 🔐 Environment Variables

Create `.env` file:

```
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_STRIPE_KEY=your_stripe_publishable_key
REACT_APP_RAZORPAY_KEY=your_razorpay_key_id
```

## 🐛 Troubleshooting

### API Connection Issues
- Verify backend is running on port 8080
- Check CORS configuration
- Inspect browser console for errors

### Payment Failures
- Verify payment gateway keys
- Check test mode is enabled
- Use test card numbers

### Seat Selection Issues
- Clear browser cache
- Check date format
- Verify bus and route IDs

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License

## 👨‍💻 Author

Created with ❤️ by Bhindi Team

## 🔗 Related

- Backend Repository: [bus-booking-backend-springboot](https://github.com/sampurnv/bus-booking-backend-springboot)

---

**Happy Booking! 🚌**