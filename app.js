const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const port = 5000;
const cors = require("cors")


app.use(cors())
mongoose.connect("mongodb+srv://yasasvipreetam:yasasvipreetam@cluster0.fvjeuvz.mongodb.net/photos?retryWrites=true&w=majority")
    .then(()=>{
        console.log("MongoDB connected...")
    })
    .catch((err)=>{
        console.log("Error connecting...",err)
    })

app.get("/",(req,res)=>{
    res.send("Backend Srtarted...")
})

require("./models/user")
require("./models/post")


app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/post"))


app.listen(port,()=>{
    console.log("Server running on port",port)
})