const express=require("express");
const cors = require('cors');
const app=express();
const Router=require("./Routes");
const dbConnect = require("./Connections/Connection");

dbConnect();
app.use(cors())
app.get("/",(req,res)=>{
    res.status(200).send("Working")
})

app.use("/api",Router)

app.listen(2300);