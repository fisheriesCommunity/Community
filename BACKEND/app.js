
//QKXpuF7m67GwIdA3

const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/RequestRoutes");
const app = express();
const cors = require("cors");

//middleware

app.use(express.json());
app.use(cors());
app.use("/requests", router);
app.use("/file", express.static("file"));





mongoose.connect("mongodb+srv://Vimasha:QKXpuF7m67GwIdA3@loandb.n37fe.mongodb.net/")
.then(() => console.log("Connected to MongoDB"))
.then(() => {
    app.listen(5000);
})
.catch((err) => console.log((err)));
//Register
//Call Register Model
require("./Model/Register");
const Treasurer = mongoose.model("Register");
app.post("/register", async(req, res) => {
    const { name, gmail, password } = req.body;
    try{
        await Treasurer.create({
            name,
            gmail,
            password,
        })
        res.send({status:"ok"});
    }catch(err){
        res.send({status:"error"});
    }
});

//Login
//Call Login Model
app.post("/login", async(req, res) => {
    const { gmail, password } = req.body;
    try{
        const treasurer = await Treasurer.findOne({gmail});
        if(!treasurer){
            return res.json({err:"Invalid Login"})
        }
        if(treasurer.password === password){
            return res.json({status:"ok"});
        }else{
            return res.json({err:"Incorrect Password"})
        }
    }catch(err){
        console.error(err);
        res.status(500).json({err:"Server Error"})
    }
});

//setup multer
const multer = require("multer");
const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './file');
    },
    filename:function(req, file, cb){
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },

});

//insert model part
require("./Model/PdfModel");
const pdfSchema = mongoose.model("PdfDetails");

const upload = multer({storage})
app.post("/uploadFile", upload.single("file"), async(req, res) => {
    console.log(req.file);
    const name = req.body.name;
    const title = req.body.title;
    const pdf = req.file.filename;
    try{
        await pdfSchema.create({
            name:name,
            title:title,
            pdf:pdf,
        });
        console.log("File uploaded successfully");
        res.send({status:200}); 
    }catch(err){
        console.log(err);
        res.status(500).send({status: "error"});
    }   
    
});

//get model part
app.get("/getFile", async(req, res) => {
    try{
        const data = await pdfSchema.find({});
        res.send({status: 200, data: data});
    }catch(err){
        console.log(err);
        res.status(500).send({status: "error"});
    }
});