const express=require("express");
const bodyParser = require('body-parser');
const TaskS = require("./models/data");
const routes=express.Router();

routes.use(express.json())

routes.get("/AllTasks",async(req,res)=>{
    try{
    const data= await TaskS.find();
    res.json(data);
        console.log(data);
    }catch(err){
        res.status(400).json({message:err.message});
    }

})
routes.post("/AddTask",async(req,res)=>{
        const task = new TaskS(req.body)
    try{
          await task.save();
          res.status(201).send("Task saved id: ")
        }catch(err){
            console.log(err)
        }
        
                })

routes.get("/Task/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const data=await TaskS.findById(id);
        res.json(data);
        }catch(err){
            console.log(err);
        }
})

routes.put("/EditTask/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const data=await TaskS.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json(data).send("Updated");
        }catch(err){
            console.log(err);
            }
})
routes.delete("/delete/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const data= await TaskS.findByIdAndDelete(id);
        res.status(200).send("Deleted")
    }catch(err){
        console.log(err)
    }
})

routes.get("/findbystatus/:status",async (req,res)=>{
    try{
        const status=req.params.status;
        const data=await TaskS.find({status});
        res.json(data);
        }catch(err){
            console.log(err)
            }
})


routes.get("/findByName/:name",async(req,res)=>{
    try{
        const name=req.params.name;
        const data=TaskS.find({name});
        res.json(data);
    }catch(err){
        console.log(err);
    }
})


module.exports=routes