import express from "express";
import connectDB from "./config/database.js";
import { configDotenv } from "dotenv";

// dotenv
configDotenv();
connectDB();
const app = express()
app.use(express.json())

import userRouter from "./router/userRoutes.js";
app.use("/api/users/", userRouter);

import helpRouter from "./router/helpRoutes.js"
app.use("/api/helps/", helpRouter);


app.listen(3000, () => {
	console.log("listen");
})
