import express from "express"
import multer from "multer"
const app = express()
app.use(express.json())


import database from "./config/database.js"

import fs from 'node:fs';

const folderName = process.cwd() + '/Users/uploads';


import storage from "./config/multer.js"

const upload = multer({ storage: storage })


import user_info from "./router/user_information.js"
app.use(user_info)




app.listen(3000, () => {
	console.log("listen");

	database()
})
