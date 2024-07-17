const mongoose=require("mongoose");

const TaskSchema=new mongoose.Schema({
    id:{type:mongoose.Schema.Types.ObjectId},
    taskname:{type:String},
    taskdata:{type:String},
    tasklastdate:{type:String},
    status:{type:String}
},{
    versionKey:false
})
const TaskS=mongoose.model("TaskS",TaskSchema);

module.exports=TaskS;
