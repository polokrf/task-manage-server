import sendResponseToClient from "../response.js";
import { dashboardService } from "./dashboard.service.js";




const adminDashboard = async (req, res) => {
  try {
    const result = await dashboardService.adminDashboardDB();
    // console.log(result)
    sendResponseToClient(res, 200, true, 'get over view', result);
  } catch (error) {
    sendResponseToClient(res, 500, false, 'something is wrong');
  }
};
const employDashboard = async (req, res) => {
  try {
    const { email } = req.query;
    const result = await dashboardService.employDashboardDB(email);
    sendResponseToClient(res, 200, true, 'get over view', result);
  } catch (error) {
    sendResponseToClient(res, 500, false, 'something is wrong');
  }
};

export const dashboardController = {
  adminDashboard,
  employDashboard,
};

