const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const communityMembersRoute = require('./routes/communityMembers');
const paymentRoute = require('./routes/payment');



const app = express();
//C8WqhO8CznkwPA7U
//mongodb+srv://Admin:<db_password>@employeemanagement.ojirz.mongodb.net/?retryWrites=true&w=majority&appName=EmployeeManagement
// MongoDB Connection
mongoose.connect('mongodb+srv://Admin:C8WqhO8CznkwPA7U@employeemanagement.ojirz.mongodb.net/?retryWrites=true&w=majority&appName=EmployeeManagement', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', communityMembersRoute);
app.use('/api', paymentRoute);


app.post('/api/payments', async (req, res) => {
    try {
      const payment = new Payment(req.body);
      await payment.save();
      res.status(201).json({ message: 'Payment successful', payment });
    } catch (error) {
      res.status(400).json({ message: 'Error processing payment', error });
    }
  });

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
