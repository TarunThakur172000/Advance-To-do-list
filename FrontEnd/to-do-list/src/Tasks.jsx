import React,{useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from 'react-tooltip';
import {deleteTask, fetchTasks, updateTask} from './Functions'
import './App.css'
function Tasks(data ,setdata){
    const Close=<FontAwesomeIcon icon={faTrash} />
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [taskname, settaskname] = useState("");
    const [taskdata, settaskdata] = useState("");
    const [tasklastdate, settasklastdate] = useState("");
    const [status, setstatus] = useState("False");

    useEffect(()=>{
        
    },[])

    const handlePopupOpen = () => {
        setIsPopupVisible(true);
        settaskname(data.data[0].taskname);
        settaskdata(data.data[0].taskdata);
        settasklastdate(data.data[0].tasklastdate)
        setstatus(data.data[0].status)
    };
    
    const handlePopupClose = () => {
        setIsPopupVisible(false);
    };

    const handleUpdate= async (id)=>{
        await updateTask(id,taskname,taskdata,tasklastdate,status);
        const task= await fetchTasks();
        setdata(task)
    }
   
   
    
   

    if (!data.data) {
        return <p>Loading tasks...</p>; 
      }
      else{
    return(
        <div className="tasks">
             <div className="taskList">
                    <div className="taskListHeader">
                        <div className="taskListHeaderName">Task Name</div>
                        <div className="taskListHeaderDate">Date</div>
                        <div className="taskListHeaderStatus">Status</div>
                        <div >Delete</div>
                        <div >Edit</div>
                    </div>
                    <div className="taskListBody">
                        {data.data.map((task)=>(
                            
                            <div className="taskListHeader" key={task._id}>
                                {console.log(task.taskdata)}
                                <div className="taskListBodyItemName">{task.taskname}</div>
                                <div className="taskListBodyItemDate">{task.tasklastdate}</div>
                                <div className="taskListBodyItemStatus">{task.status}</div>
                                <div className="taskListHeaderDelete" onClick={()=>{deleteTask(task._id)}} data-tooltip-id="deleteTooltip">{Close}</div>
                                <div className="taskListHeaderEdit" data-tooltip-id="editTooltip" onClick={()=>{handlePopupOpen()}}>Edit</div>
                                {isPopupVisible && (
                        <div className="popup-wrap" style={{ display: isPopupVisible ? 'block' : 'none', opacity: isPopupVisible ? 1 : 0 }}>
                            <div className={`popup-box ${isPopupVisible ? 'transform-in' : 'transform-out'}`}>
                                <button className="popup-close" onClick={handlePopupClose}>Close</button>
                                <div className="popup-content">
                                    <div>
                                        <input type="text" onChange={(e) => settaskname(e.target.value)} placeholder={taskname} />
                                    </div>
                                    <div>
                                        <input type="text" onChange={(e) => settaskdata(e.target.value)} placeholder={taskdata} />
                                    </div>

                                    <div>
                                        <input type="date" onChange={(e) => settasklastdate(e.target.value)} placeholder={tasklastdate} />
                                    </div>
                                    <div>
                                        <select onChange={(e) => setstatus(e.target.value)}>
                                            <option value="False">False</option>
                                            <option value="True">True</option>
                                        </select>
                                    </div>
                                    <button onClick={()=>{handleUpdate()}}>Update Task</button>
                                </div>
                            </div>
                        </div>
                    )}
                                
                                </div>
                                ))}
                                
                    </div>
                </div>
                    <Tooltip id="editTooltip" place="top" effect="solid">Edit Task</Tooltip>
                    <Tooltip id="deleteTooltip" place="top" effect="solid">Delete Task</Tooltip>
                
        </div>
    )
}
}

export default Tasks;