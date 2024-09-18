const express = require('express');
const router = express.Router();
const ticketController = require('../Controllers/ticketController');

// Route to create a new event/ticket
router.post('/add-ticket', ticketController.addTicket);

// Route to get a single event/ticket by ID
router.get('/getTickets/:id', ticketController.getTicketById);

// Route to get all events/tickets
router.get('/getTickets', ticketController.getAllTickets);

// Route to update an event/ticket by ID
router.put('/tickets/:id', ticketController.updateTicketById);

// Route to delete an event/ticket by ID
router.delete('/tickets/:id', ticketController.deleteTicketById);

module.exports = router;
