import express from "express"
import { login, logout, SignUp } from "../controllers/AuthControllers.js";
const router=express.Router();
router.post('/signup',SignUp);
router.post('/logout',logout);
router.post('/login',login);
export default router;