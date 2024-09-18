require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const ticketRoutes = require('./routes/ticketRoute'); // Correct path to ticketRoutes.js
const bookingRoutes = require('./routes/bookingRoute'); // Correct path to bookingRoutes.js

const app = express();

app.use(express.json()); // Middleware to parse JSON requests

// Ticket routes
app.use('/api/tickets', ticketRoutes);

// Booking routes
app.use('/api/bookings', bookingRoutes); // Ensure this is the correct path for booking routes

// MongoDB connection
const mongoURI = process.env.MONGODB_URI; // Get the URI from environment variables
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
