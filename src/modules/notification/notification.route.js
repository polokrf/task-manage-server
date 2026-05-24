import { Router } from "express";
import { authToken } from "../../middleWear/middleWear.js";
import { notificationController } from "./notification.controller.js";

const router = Router();

// get admin notification
router.get('/admin', authToken('admin'), notificationController.adminNotification)

// employ notification
router.get('/employ', authToken('employ'), notificationController.employNotification)

router.patch('/:id',authToken('employ','admin'),notificationController.updatedNotification)

export const notificationRouter = router