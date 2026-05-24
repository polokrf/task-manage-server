import { Router } from "express";
import { employController } from "./empoly.controller.js";
import { authToken } from "../../middleWear/middleWear.js";

const router = Router();

// get all data only admin
router.get('/all', authToken('admin'), employController.getAllEmploy);
// only  chang user status chang  admin
router.patch('/status', authToken('admin'), employController.updateUserStatus);
// user can chang own profile
router.patch('/edit-profile', authToken(), employController.updateUserProfile);
// admin can delete any user
router.delete('/delete/:id',authToken('admin'),employController.deleteEmploy)


export const employRouter = router