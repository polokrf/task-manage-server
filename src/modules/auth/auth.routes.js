import { Router } from "express";
import { authController } from "./auth.controller.js";
import { authToken } from "../../middleWear/middleWear.js";

const router = Router();

router.post('/register',authController.register)
router.post('/login', authController.login)
router.get('/user', authToken(), authController.authSingleUSer);

export const authRouter = router;