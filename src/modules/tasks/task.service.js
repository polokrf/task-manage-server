import { ObjectId } from "mongodb";
import { getDB } from "../../config/db.js";

const postTaskDB = async (payload) => {
  try {
    const db = getDB()
    const result = await db.collection('all-task').insertOne(payload)

    const newNotification = {
      admin_name: payload.admin_name,
      admin_image: payload.admin_image,
      admin_email: payload.admin_email,
      is_get: 'employ',
      title: 'assign a new task',
      is_read: false,
      employ_email: payload.employ_email,
      employ_id: payload.employ_id,
      link: `/dashboard/my-task/${result.insertedId}`,
    };
  const notification = await db.collection('notification').insertOne(newNotification)
   return result
  } catch (error) {
    console.log(error)
  }
}

const getAllTaskDB = async (payload) => {
  try {
    const db = getDB()
    const { limit, skip, filter,search } = payload
    const query = {}
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (filter) {
      query.status=filter
    }
    const result = await db.collection('all-task').find(query).sort({ _id: 1 }).limit(Number(limit)).skip(Number(skip)).toArray()
    const totalTask = await db.collection('all-task').countDocuments(query);
   return{task:result,totalTask}
  } catch (error) {
    console.log(error)
  }
}

const getSingleTaskDB = async (id) => {
  try {
    const db = getDB()
   const query = {_id:new ObjectId(id)}
    const result = await db.collection('all-task').findOne(query)
    // console.log(result)
   return result
  } catch (error) {
    console.log(error)
  }
}

// only user get own task
const getOwnTaskDB = async (payload) => {
  try {

    const db = getDB()
    const {email,status,limit,skip,search}=payload
    const query = { employ_email: email, status }
    if (search) {
      query.title={$regex:search,$options:'i'}
    }
    const result = await db.collection('all-task').find(query).sort({ _id: 1 }).limit(Number(limit)).skip(Number(skip)).toArray()
    const countTask = await db.collection('all-task').countDocuments(query);
    // console.log(result)
   return {task:result,countTask}
  } catch (error) {
    console.log(error)
  }
}
// only user chang task status own task
const getUpdateTaskStatusDB = async (payload) => {
  try {
    const db = getDB()
    // console.log(payload)
    const {id ,status,email,name,image}=payload
    const query = { _id: new ObjectId(id) }

  

    const updateTask = {
      $set: {
        status,
        start_At:new Date()
      }
    }
    const updateTaskDone = {
      $set: {
        status,
        finish_At: new Date(),
      },
    };
    
    

    const taskStatusUpdated= status === 'inprogress' ?updateTask :updateTaskDone 
    const result = await db.collection('all-task').updateOne(query, taskStatusUpdated)
     const newNotification = {
       admin_email: 'polokkumar30@gmail.com',
       is_get: 'admin',
       title: `work status updated ${status}`,
       is_read: false,
       employ_email: email,
       employ_name: name,
       employ_image: image,
       link: `/dashboard/task/${id}`,
     };
     const notification = await db.collection('notification').insertOne(newNotification);
    // console.log(result)
   return result
  } catch (error) {
    console.log(error)
  }
}
const getUpdateTaskDB = async (id,payload) => {
  try {
    const db = getDB()
    // console.log(payload)
    const query = { _id: new ObjectId(id) }
    const updateTask = {
      $set: {
       ... payload
      }
    }
    const result = await db.collection('all-task').updateOne(query,updateTask)
    // console.log(result)
   return result
  } catch (error) {
    console.log(error)
  }
}
const getDeleteTaskDB = async (id) => {
  try {
    const db = getDB()
    // console.log(payload)
    const query = { _id: new ObjectId(id) }
    
    const result = await db.collection('all-task').deleteOne(query)
    // console.log(result)
   return result
  } catch (error) {
    console.log(error)
  }
}


export const taskService = {
  postTaskDB,
  getAllTaskDB,
  getSingleTaskDB,
  getUpdateTaskDB,
  getDeleteTaskDB,
  getOwnTaskDB,
  getUpdateTaskStatusDB,
};