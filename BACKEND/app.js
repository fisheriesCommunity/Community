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