import sendResponseToClient from "../response.js"
import { taskService } from "./task.service.js";
 
// only admin create a task
const postTask= async (req, res) => {
  try {
    const body = req.body
    const {employ_email}=req.body
    
    if (!employ_email) {
      sendResponseToClient(res, 404, false, 'assign email is missing');
      return;
    }
    const newTask = {
      ...body,
      status: 'pending',
      createdAt:new Date()
    }
   
    
    const result = await taskService.postTaskDB(newTask)
    sendResponseToClient(res,200,true,'update success', result)
  } catch (error) {
     sendResponseToClient(res, 500, false, 'post task not success !!');
  }
}
// only admin see all job task
const getAllTask= async (req, res) => {
  try {
   const result = await taskService.getAllTaskDB(req.query)
    sendResponseToClient(res,200,true,'get all task success', result)
  } catch (error) {
     sendResponseToClient(res, 500, false, ' something is wrong!!');
  }
}

// admin an employ view details single task admin all see all task details and employ only own
const getSingleTask= async (req, res) => {
  try {
    const { id } = req.params
    // console.log(id)
    const result = await taskService.getSingleTaskDB(id)
    if (!result) {
       sendResponseToClient(res, 404, false, 'task is not found');
    }
    sendResponseToClient(res,200,true,' task get success', result)
  } catch (error) {
     sendResponseToClient(res, 500, false, 'something is wrong!!');
  }
}
// only employ own data get
const getOwnTask= async (req, res) => {
  try {
    
    // console.log(id)
    const result = await taskService.getOwnTaskDB(req.query);
    if (!result) {
       sendResponseToClient(res, 404, false, 'task is not found');
    }
    sendResponseToClient(res,200,true,' task get success', result)
  } catch (error) {
     sendResponseToClient(res, 500, false, 'something is wrong!!');
  }
}
// only can chang task status
const getUpdateTaskStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    if (!id || !status) {
      sendResponseToClient(res, 404, false, 'plz check id or status');
    }
    // console.log(id)
    const result = await taskService.getUpdateTaskStatusDB(req.body);

    sendResponseToClient(res, 200, true, ' task update success', result);
  } catch (error) {
    sendResponseToClient(res, 500, false, 'something is wrong!!');
  }
};

// only admin chang job task
const getUpdateTask= async (req, res) => {
  try {
    const { id } = req.params
    console.log(id)
    const {title}=req.body
    if (!id || !title) {
      sendResponseToClient(res, 404, false, 'plz check id or title');
    }
    // console.log(id)
    const result = await taskService.getUpdateTaskDB(id,req.body);
    
    sendResponseToClient(res,200,true,' task update success', result)
  } catch (error) {
     sendResponseToClient(res, 500, false, 'something is wrong!!');
  }
}

// only admin delete job task
const getDeleteTask= async (req, res) => {
  try {
    const { id } = req.params
    
  if (!id ) {
      sendResponseToClient(res, 404, false, 'plz check id');
    }
    // console.log(id)
    const result = await taskService.getDeleteTaskDB(id);
    
    sendResponseToClient(res,200,true,' task update success', result)
  } catch (error) {
     sendResponseToClient(res, 500, false, 'something is wrong!!');
  }
}

export const taskController = {
  postTask,
  getAllTask,
  getSingleTask,
  getUpdateTask,
  getDeleteTask,
  getOwnTask,
  getUpdateTaskStatus,
};