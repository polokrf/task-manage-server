import { Router } from "express";
import { taskController } from "./tasks.controller.js";
import { authToken } from "../../middleWear/middleWear.js";

const router = Router();
// admin only provide task
router.post('/post', authToken('admin'), taskController.postTask)
// admin only access all task
router.get('/all', authToken('admin'), taskController.getAllTask)
// admin and employ access task details
router.get('/single/:id', authToken('admin', 'employ'), taskController.getSingleTask)
// employ can access only own task
router.get('/own', authToken('employ'), taskController.getOwnTask);
// admin only update all task if task status is pending
router.patch('/update/:id', authToken('admin'), taskController.getUpdateTask);

// employ only update own task work status
router.patch('/status-update', authToken('employ'), taskController.getUpdateTaskStatus);

// admin only delete task
router.delete('/delete/:id',authToken('admin'), taskController.getDeleteTask);

export const taskRouter = router
