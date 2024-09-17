//pipmd3Mzu1SHYRSE   //hqduSSjiSvg7EO1x

const express = require("express");
const mongoose = require("mongoose");
const router = require("./route/boatregistation route");

const app = express();
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());
app.use("/users",router);

mongoose.connect("mongodb+srv://minuuu:hqduSSjiSvg7EO1x@cluster0.d9xye.mongodb.net/")
.then(()=>console.log("connect to mongo db"))
.then(() => {
    app.listen(5059);
})
.catch((err)=> console.log((err)));