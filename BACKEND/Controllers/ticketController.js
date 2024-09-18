const Ticket = require('../models/ticket');

// Create a new ticket/event
exports.addTicket = async (req, res) => {
    try {
        const { image, title, date, location } = req.body;
        const newTicket = new Ticket({
            image,
            title,
            date,
            location,
        });
        await newTicket.save();
        res.status(201).json({ message: 'Event created successfully', ticket: newTicket });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create event' });
    }
};

// Get a single ticket by ID
exports.getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ticket', error });
    }
};

// Get all tickets/events
exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json({ tickets });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tickets', error });
    }
};

// Update a ticket/event by ID
exports.updateTicketById = async (req, res) => {
    try {
        const { image, title, date, location } = req.body;
        const updatedTicket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { image, title, date, location },
            { new: true }
        );
        if (!updatedTicket) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ message: 'Event updated successfully', ticket: updatedTicket });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update event' });
    }
};

// Delete a ticket/event by ID
exports.deleteTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete event' });
    }
};
