import express from "express"
import multer from "multer"
const app = express()
app.use(express.json())


import database from "./config/database.js"

import fs from 'node:fs';

const folderName = process.cwd() + '/Users/uploads';


import storage from "./config/multer.js"

const upload = multer({ storage: storage })


import userRouter from "./router/userRoutes.js";
app.use("/api/users/", userRouter);

import helpRouter from "./router/helpRoutes.js"
app.use("/api/helps/", helpRouter);


app.listen(3000, () => {
	console.log("listen");

	database()
})
