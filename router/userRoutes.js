import express from 'express';
import {createUser, listUsers, sendOtp} from '../controllers/userController.js';

const userRouter=express.Router()

userRouter.post('/', createUser)
userRouter.get('/', listUsers)
userRouter.post('/otp', sendOtp)

export default userRouter;