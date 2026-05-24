import jwt from 'jsonwebtoken'
import { getDB } from '../config/db.js';
import { ObjectId } from 'mongodb';

export const authToken =(...role) => {
  return async (req, res, next) => {
    try {
     const db=getDB()
     const authorized = req.headers.authorization;
     if (!authorized) {
       return res.status(401).json({ message: 'unauthorized' });
     }
     const token = authorized.split(' ')[1];
     if (!token) {
       return res.status(403).json({ message: 'forbidden access' });
     }

      
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      
      const user = await db.collection('employCollection').findOne({ _id: new ObjectId(decoded?.user_id) })
      
      if (!user) {
         return res.status(403).json({ message: 'forbidden access' });
      }
     

      if (user?.status === 'block') {
         return res.status(403).json({ message: 'forbidden access' });
      }
      
      if (role.length && !role.includes(user?.role)) {
        return res.status(403).json({ message: 'forbidden access' });
      }

    //  console.log(decoded)

     next();
   } catch (error) {
     console.log(error);
     return res.status(403).json({
       message: 'Forbidden access',
     });
   }
 }
}