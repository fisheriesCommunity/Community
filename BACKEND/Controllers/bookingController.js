// controllers/bookingController.js
const Booking = require('../models/bookings');

// Get all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({});
        res.send(bookings);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching bookings', error });
    }
};

// Create a new booking
const createBooking = async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).send(booking);
    } catch (error) {
        res.status(400).send({ message: 'Error creating booking', error });
    }
};

// Get bookings by user ID
const getBookingsByUserId = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.params.userId });
        res.status(200).json({ bookings });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching bookings', error });
    }
};

// Delete a booking by ID
const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).send('Booking not found');
        }
        res.status(200).send(booking);
    } catch (error) {
        res.status(500).send({ message: 'Error deleting booking', error });
    }
};

// Update a booking by ID
const updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!booking) {
            return res.status(404).send('Booking not found');
        }
        res.status(200).send(booking);
    } catch (error) {
        res.status(500).send({ message: 'Error updating booking', error });
    }
};

module.exports = {
    getAllBookings,
    createBooking,
    getBookingsByUserId,
    deleteBooking,
    updateBooking,
};
