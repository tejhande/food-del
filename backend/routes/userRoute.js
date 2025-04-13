import express from 'express';
import { loginUser,registerUser } from '../controllers/userController.js';
const userRouter = express.Router();
import userModel from '../models/userModel.js';

userRouter.get('/', async (req, res) => {
    try {
        const users = await userModel.find().sort({ createdAt: -1 });
        res.json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);

export default userRouter;