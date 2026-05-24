import { getDB } from '../../config/db.js';

const adminDashboardDB = async () => {
  try {
    const db = getDB();
    const totalUser = await db.collection('employCollection').countDocuments();
    const totalTAsk = await db.collection('all-task').countDocuments();
    const totalPending = await db.collection('all-task').countDocuments({ status: 'pending' });
    const totalInprogress = await db.collection('all-task').countDocuments({ status: 'inprogress' });
    const totalDone = await db.collection('all-task').countDocuments({ status: 'done' });
    const recentTask = await db.collection('all-task').find().sort({ _id: 1 }).limit(4).toArray();

    return {
      totalDone,
      totalInprogress,
      totalPending,
      totalTAsk,
      totalUser,
      recentTask,
    };
  } catch (error) {
    console.log(error);
  }
};
const employDashboardDB = async email => {
  try {
    const db = getDB();

    const totalTAsk = await db.collection('all-task').countDocuments({ employ_email: email });
    const totalPending = await db.collection('all-task').countDocuments({ employ_email: email, status: 'pending' });
    const totalInprogress = await db.collection('all-task').countDocuments({ employ_email: email, status: 'inprogress' });
    const totalDone = await db.collection('all-task').countDocuments({ employ_email: email, status: 'done' });
    const recentTask = await db.collection('all-task').find({ employ_email: email }).sort({ _id: 1 }).limit(4).toArray();

    return {
      totalDone,
      totalInprogress,
      totalPending,
      totalTAsk,
      recentTask,
    };
  } catch (error) {
    console.log(error);
  }
};

export const dashboardService = {
  adminDashboardDB,
  employDashboardDB,
};