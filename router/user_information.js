import express from 'express'

const user_info=express.Router()

import user_info_controller from '../controllers/user_inormation_controller.js'
user_info.post('/user/data',user_info_controller)

export default user_info