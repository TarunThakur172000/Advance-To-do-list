import React, { useEffect, useState } from "react";
import Tasks from "./Tasks";
import { addNewTask, fetchTasks } from './Functions';

function TaskSection() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [taskStatus, setTaskStatus] = useState("False");
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadTasks = async () => {
            const tasks = await fetchTasks();
            setData(tasks);
        };
        loadTasks();
    }, []);

    const handlePopupOpen = () => {
        setIsPopupVisible(true);
    };

    const handlePopupClose = () => {
        setIsPopupVisible(false);
    };

    const handleAddTask = async () => {
        await addNewTask(taskName, taskDescription, taskDate, taskStatus);
        const tasks = await fetchTasks(); // Refresh the task list
        setData(tasks);
        handlePopupClose(); // Close the popup
    };

    return (
        <div className="task-section">
            <div className="taskSearch">
                <input type="text" id="Task_name" placeholder="Which Task?" />
                <button>Search</button>
                <button onClick={handlePopupOpen}>Add Task</button>
                <div className="main">
                    {isPopupVisible && (
                        <div className="popup-wrap" style={{ display: isPopupVisible ? 'block' : 'none', opacity: isPopupVisible ? 1 : 0 }}>
                            <div className={`popup-box ${isPopupVisible ? 'transform-in' : 'transform-out'}`}>
                                <button className="popup-close" onClick={handlePopupClose}>Close</button>
                                <div className="popup-content">
                                    <div>
                                        <input type="text" onChange={(e) => setTaskName(e.target.value)} placeholder="Task Name" />
                                    </div>
                                    <div>
                                        <input type="text" onChange={(e) => setTaskDescription(e.target.value)} placeholder="Task Description" />
                                    </div>
                                    <div>
                                        <input type="date" onChange={(e) => setTaskDate(e.target.value)} placeholder="Task Date" />
                                    </div>
                                    <div>
                                        <select onChange={(e) => setTaskStatus(e.target.value)} value={taskStatus}>
                                            <option value="False">False</option>
                                            <option value="True">True</option>
                                        </select>
                                    </div>
                                    <button onClick={handleAddTask}>Add Task</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div>
                {data.length > 0 ? (
                    <Tasks data={data} setdata={setData}/>
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
        </div>
    );
}

export default TaskSection;
 