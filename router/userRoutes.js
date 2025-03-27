import express from 'express';
import {createUser, listUsers, loginUser, sendOtp, getUserByToken, addContact, removeContact} from '../controllers/userController.js';

const userRouter=express.Router()

userRouter.post('/', createUser)
userRouter.post('/login', loginUser)
userRouter.get('/', listUsers)
userRouter.post('/contact/add', addContact)
userRouter.post('/contact/remove', removeContact)
userRouter.post('/otp', sendOtp)
userRouter.post('/self', getUserByToken)

export default userRouter;