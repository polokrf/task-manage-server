import { ObjectId } from "mongodb";
import { getDB } from "../../config/db.js"
import sendResponseToClient from "../response.js";

const getEmployDB = async(payload) => {
  try {
    const db = getDB();
    const {search,filter,limit,skip}=payload
    const query = {};
    if (search) {
      query.$or=[{name:{ $regex:search, $options: "i" }},{email:{ $regex:search, $options: "i" }}]
    }

    if (filter) {
      query.status=filter
    }
    const result = await db.collection('employCollection').find(query, { projection: { password: 0 } }).sort({ _id: 1 }).limit(Number(limit)).skip(Number(skip)).toArray();
    
    const countUsers = await db.collection('employCollection').countDocuments(query);
    return {users:result,countUsers}
  } catch (error) {
    console.log(error)
  }
}

// update admin user active status
const updateUserStatusDB = async (payload) => {
  try {
    const db = getDB()
    const { id, status } = payload;
    const query = { _id: new ObjectId(id) }
    
    const updateStatus = {
      $set:{
        status:status
      }
    }
    const result = await db.collection('employCollection').updateOne(query, updateStatus);
    return result
  } catch (error) {
    console.log(error)
  }
}

// user oly chang there own profile
const updateUserProfileDB = async (payload) => {
  try {
    const db = getDB()
    const { id, image } = payload;
    const query = { _id: new ObjectId(id) }
    
    const updateProfile = {
      $set:{
        image
      }
    }
    const result = await db.collection('employCollection').updateOne(query, updateProfile);
    return result
  } catch (error) {
    console.log(error)
  }
}


const deleteEmployDB = async (id,res) => {
  try {
    const db = getDB()
    const query = { _id: new ObjectId(id) }
    const result = await db.collection('employCollection').deleteOne(query)
    return result
    
  } catch (error) {
    console.log(error)
  }
}
export const employService = {
  getEmployDB,
  updateUserStatusDB,
  deleteEmployDB,
  updateUserProfileDB,
};