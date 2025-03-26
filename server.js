import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./config/database.js";
import { configDotenv } from "dotenv";
import cors from "cors";

// dotenv
configDotenv();
connectDB();
const app = express()
const httpServer = createServer( app);

/* Start Socket*/
new ServerSocket(httpServer);

app.use(express.json())
app.use(cors());


//app routes
import userRouter from "./router/userRoutes.js";
app.use("/api/users/", userRouter);

import helpRouter from "./router/helpRoutes.js"
app.use("/api/helps/", helpRouter);

import mediaRouter from "./router/mediaRoutes.js";
import { ServerSocket } from "./socket.js";
app.use("/api/images", mediaRouter);

httpServer.listen(3000, () => {
	console.log(`Listening on port 3000`);
}); 