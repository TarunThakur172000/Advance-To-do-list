const mongoose=require("mongoose");

function dbConnect(){
mongoose.connect("mongodb://localhost:27017/taskDetails");
mongoose.connection.on("connected",()=>{
        console.info("Connection Established Sucessfuly")
})

mongoose.connection.on("disconnected",()=>{
    console.info("Connection Disconnected");
})

mongoose.connection.on("error",()=>{
    console.error("Something Went Unexpeted Error: "+err)
})
}

module.exports=dbConnect;