const express = require('express');
const app= new express();
const router =express.Router();
const connectDB = require('./db');
// middleware to parse json format data
app.use(express.json({ extended: true }));
// routers
app.use("/api/first", require("./routes/api/first"));
app.use("/api/second", require("./routes/api/second"));
app.use("/api/third", require("./routes/api/third"));
app.listen(5000,()=>{
    connectDB();
    console.log('server started on port 5000')
})

