
//app.js
const express = require ("express");
const mongoose = require("mongoose");
const router = require ("./Route/UserRouter");

const app = express();
const cors = require("cors");

//Middleware
app.use(express.json());
app.use(cors());
app.use("/users",router);

mongoose.connect("mongodb+srv://admin:lqhlcqTNVSzGt4Xu@fishstocks.oyejb.mongodb.net/")
.then(()=> console.log("Connected to MongoDB"))
.then(() => {
    app.listen(5005);
})
.catch((err)=> console.log((err)));

const express = require("express");  // Import Express
const mongoose = require("mongoose");  // Import Mongoose to connect to MongoDB
const cors = require("cors");  // Import CORS to handle cross-origin requests
const multer = require("multer");  // Import Multer to handle file uploads
const path = require("path");  // To work with file paths

// Import routes
const complaintRoutes = require("./Routes/ComplaintRoutes");  // Import complaint routes
const requestRoutes = require("./Routes/RequestRoutes");  // Import request routes
const boatRegistrationRoutes = require("./route/boatregistation route");  // Import boat registration routes

const app = express();  // Create Express app
const PORT = process.env.PORT || 8000;  // Define the server port
const MONGO_URI = "mongodb+srv://minuuu:hqduSSjiSvg7EO1x@cluster0.d9xye.mongodb.net/";  // MongoDB connection URI

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

