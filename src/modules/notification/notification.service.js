import { ObjectId } from "mongodb";
import { getDB } from "../../config/db.js"

const adminNotificationDB = async () => {
  try {
    const db = getDB()
    const query = { admin_email:'polokkumar30@gmail.com', is_get: 'admin',is_read:false };
    const result = await db.collection('notification').find(query).toArray()
    return result
  } catch (error) {
    console.log(error)
  }
}
const employNotificationDB = async (email) => {
  try {
    const db = getDB()
    const query = { employ_email: email, is_get: 'employ', is_read: false };
    const result = await db.collection('notification').find(query).toArray()
    return result
  } catch (error) {
    console.log(error)
  }
}
const updateNotificationDB = async (id) => {
  try {
    const db = getDB()
    const query = { _id: new ObjectId(id) };
    const update = {
      $set: {
        is_read:true
      }
    }
    const result = await db.collection('notification').updateOne(query,update)
    return result
  } catch (error) {
    console.log(error)
  }
}

export const notificationService = {
  adminNotificationDB,
  employNotificationDB,
  updateNotificationDB,
};