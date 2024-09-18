// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const {
    getAllBookings,
    createBooking,
    getBookingsByUserId,
    deleteBooking,
    updateBooking
} = require('../Controllers/bookingController');

// Route to get all bookings
router.get('/all', getAllBookings);

// Route to create a new booking
router.post('/create', createBooking);

// Route to get bookings by user ID
router.get('/user/:userId', getBookingsByUserId);

// Route to delete a booking by ID
router.delete('/:id', deleteBooking);

// Route to update a booking by ID
router.put('/:id', updateBooking);

module.exports = router;
