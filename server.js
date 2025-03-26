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
const io = new Server(httpServer, {
	cors: {
		origin: "*",
	}
});
app.use(express.json())
app.use(cors());

import userRouter from "./router/userRoutes.js";
app.use("/api/users/", userRouter);

import helpRouter from "./router/helpRoutes.js"
app.use("/api/helps/", helpRouter);


io.on('connection', (socket) => {
	const helpId = socket.handshake.query.helpId;

    if (helpId) {
        socket.join(helpId);
    }
	else{
		socket.disconnect(true);
	}
})
  
httpServer.listen(3000, () => {
	console.log(`Listening on port 3000`);
}); 