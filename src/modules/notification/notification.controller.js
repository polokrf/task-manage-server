import sendResponseToClient from "../response.js"
import { notificationService } from "./notification.service.js"

const adminNotification = async (req, res) => {
  try {
    const result = await notificationService.adminNotificationDB();
    // console.log(result)
    sendResponseToClient(res, 200, true, 'get notification', result);
  } catch (error) {
    sendResponseToClient(res,500,false,'something is wrong')
  }
}
const employNotification = async (req, res) => {
  try {
    const { email } = req.query
    const result = await notificationService.employNotificationDB(email)
    sendResponseToClient(res, 200, true, 'get own notification', result);
  } catch (error) {
    sendResponseToClient(res,500,false,'something is wrong')
  }
}

const updatedNotification = async (req, res) => {
  try {
    const { id } = req.params
    // console.log(id)
    const result = await notificationService.updateNotificationDB(id)
    sendResponseToClient(res, 200, true, ' notification is read', result);
  } catch (error) {
    sendResponseToClient(res, 500, false, 'something is wrong');
  }
}


export const notificationController = {
  adminNotification,
  employNotification,
  updatedNotification
}