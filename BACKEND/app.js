const express = require("express");  // Import Express
const mongoose = require("mongoose");  // Import Mongoose to connect to MongoDB
const cors = require("cors");  // Import CORS to handle cross-origin requests
const multer = require("multer");  // Import Multer to handle file uploads
const path = require("path");  // To work with file paths
const complaintRoutes = require("./Routes/ComplaintRoutes");  // Import your routes

const app = express();  // Create Express app
const PORT = process.env.PORT || 8000;  // Define the server port
const MONGO_URI = "mongodb+srv://user:Olivea16@demo.hg0q5c8.mongodb.net/?retryWrites=true&w=majority";  // MongoDB connection URI

// Middleware
app.use(cors());  // Allow requests from different origins (CORS)
app.use(express.json());  // Parse incoming JSON data

// Multer configuration for file uploads
const upload = multer({ dest: "uploads/" });  // Store uploaded files in the 'uploads' folder

// Simple file upload route
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    res.send(`File uploaded successfully: ${req.file.filename}`);
});

// Use complaint routes
app.use("/complaints", complaintRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log the error for debugging
    res.status(500).send("Something went wrong!");  // Send a generic error message
});

// Connect to MongoDB and start the server
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("Failed to connect to MongoDB", err);
    });

