import express from 'express';
import {createUser, listUsers, loginUser, sendOtp} from '../controllers/userController.js';

const userRouter=express.Router()

userRouter.post('/', createUser)
userRouter.post('/login', loginUser)
userRouter.get('/', listUsers)
userRouter.post('/otp', sendOtp)

export default userRouter;