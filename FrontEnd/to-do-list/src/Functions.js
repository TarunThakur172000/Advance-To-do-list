import axios from 'axios';

const API_BASE_URL = "http://localhost:2300/api";

export const fetchTasks = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/AllTasks`);
        return res.data;
    } catch (err) {
        console.error("Error fetching tasks:", err);
    }
};

export const addNewTask = async (taskname, taskdata, tasklastdate, status) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/AddTask`, {
            taskname,
            taskdata,
            tasklastdate,
            status
        });
        console.log("Task added:", res.data);
        return res.data;
    } catch (err) {
        console.error("Error adding task:", err);
    }
};

export const deleteTask = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/delete/${id}`);
        console.log("Task deleted");
    } catch (err) {
        console.error("Error deleting task:", err);
    }
};

export const updateTask = async (id,taskname, taskdata, tasklastdate, status) =>{
    try{
        await axios.put(`${API_BASE_URL}/EditTask/${id}`,{
            taskname,
            taskdata,
            tasklastdate,
            status
        })
    }catch(err){
            console.log("Something went wrong " + err);
        }
    }
