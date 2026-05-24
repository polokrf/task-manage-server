import { getDB } from "../../config/db.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ObjectId } from "mongodb";

export const registerDB = async(payload,res) => {
  try {
    const db = getDB()
    const { name, email, password, image } = payload;
    if (!email && !password) {
      res.status(404).json({ message: 'email and password not found' });
      return
    }
  //  console.log(payload)
    const employ = await db.collection('employCollection').findOne({ email: email }); 
    if (employ) {
    res.status(409).json({ message: 'already you can register plz login' });
      return
    }
    const hasPassword = await bcrypt.hash(password,10)
    const newEmploy = {
      name,
      email,
      password: hasPassword,
      image,
      role:'employ',
      status:"active",
      createdAt: new Date(),
      
    }

    const result = await db.collection('employCollection').insertOne(newEmploy)
    return result;
  } catch (error) {
    console.log(error)
  }
}
export const loginDB = async(payload,res) => {
  try {
    const db = getDB()
    const { email, password } = payload;
    if (!email && !password) {
      res.status(404).json({ message: 'email and password not found' });
      return
    }
  //  console.log(payload)
    const user = await db.collection('employCollection').findOne({ email: email }); 
    if (!user) {
    res.status(401).json({ message: 'Unauthorized' });
    return
    }
    const hasPassword = await bcrypt.compare(password,user?.password)
    
    if (!hasPassword) {
      res.status(401).json({
        message: 'Invalid email or password',
      });
      return
    }

    const token = jwt.sign(
      { user_id: user?._id, email: user?.email, role: user?.role },
      process.env.JWT_SECRET,
      { expiresIn: '10d'},
    );
   return token;
  } catch (error) {
    console.log(error)
  }
}

export const authUser = async (id) => {
  try {
    const db = getDB();
    const result = await db.collection('employCollection').findOne({ _id: new ObjectId(id) });
    return result
  } catch (error) {
    console.log(error)
  }
}


export const authService = {
  registerDB,
  loginDB,
  authUser,
};