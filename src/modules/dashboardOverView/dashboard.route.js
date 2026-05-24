import { Router } from "express";
import { dashboardController } from "./dashboard.controller.js";
import { authToken } from "../../middleWear/middleWear.js";
;

const router = Router();

// admin dashboard over view

router.get('/admin',authToken('admin'), dashboardController.adminDashboard)

// employ dashboard overview
router.get('/employ',authToken('employ'),dashboardController.employDashboard)

export const dashboardRouter = router