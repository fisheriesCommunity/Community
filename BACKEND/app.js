const express = require("express");  // Import Express
const mongoose = require("mongoose");  // Import Mongoose to connect to MongoDB
const cors = require("cors");  // Import CORS to handle cross-origin requests
const multer = require("multer");  // Import Multer to handle file uploads
const path = require("path");  // To work with file paths

// Import routes
const complaintRoutes = require("./Routes/ComplaintRoutes");
const requestRoutes = require("./Routes/RequestRoutes");
const boatRegistrationRoutes = require("./Routes/boatregistation route");

const app = express();  // Create Express app

// Middleware
app.use(cors());  // Allow requests from different origins (CORS)
app.use(express.json());  // Parse incoming JSON data

// Use various routes
app.use("/complaints", complaintRoutes);  // For complaints
app.use("/requests", requestRoutes);  // For requests
app.use("/users", boatRegistrationRoutes);  // For boat registration routes
app.use("/file", express.static("file"));  // Serve static files from 'file' directory

// Setup Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './file');  // Store uploaded files in the 'file' folder
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);  // Name the file with a unique timestamp
    }
});

const upload = multer({ storage });

// Simple file upload route (for complaint management)
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    res.send(`File uploaded successfully: ${req.file.filename}`);
});

// PDF file upload route
require("./Model/PdfModel");
const pdfSchema = mongoose.model("PdfDetails");

app.post("/uploadFile", upload.single("file"), async (req, res) => {
    const { name, title } = req.body;
    const pdf = req.file.filename;
    try {
        await pdfSchema.create({
            name,
            title,
            pdf,
        });
        console.log("File uploaded successfully");
        res.send({ status: 200 });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "error" });
    }
});

// Get uploaded files
app.get("/getFile", async (req, res) => {
    try {
        const data = await pdfSchema.find({});
        res.send({ status: 200, data: data });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "error" });
    }
});

// User Registration and Login
require("./Model/Register");
const Treasurer = mongoose.model("Register");

app.post("/register", async (req, res) => {
    const { name, gmail, password } = req.body;
    try {
        await Treasurer.create({
            name,
            gmail,
            password,
        });
        res.send({ status: "ok" });
    } catch (err) {
        res.send({ status: "error" });
    }
});

app.post("/login", async (req, res) => {
    const { gmail, password } = req.body;
    try {
        const treasurer = await Treasurer.findOne({ gmail });
        if (!treasurer) {
            return res.json({ err: "Invalid Login" });
        }
        if (treasurer.password === password) {
            return res.json({ status: "ok" });
        } else {
            return res.json({ err: "Incorrect Password" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Server Error" });
    }
});

// Error handling middleware
app.use("/", (req, res, next) => {
    res.send("It is Working");
});

// MongoDB Connection URI
const mongoURI = "mongodb+srv://admin:WCxmjnperCjmX0pK@clusterfisheries.5mn6x.mongodb.net/FisheriesCommunityDB?retryWrites=true&w=majority";

// Connect to MongoDB and start the server
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB");
    const PORT = 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => console.log("MongoDB connection error:", err));
