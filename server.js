import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./config/database.js";
import { configDotenv } from "dotenv";
import cors from "cors";
import redisClient from "./config/redis.js";

// dotenv
configDotenv();
connectDB();
const app = express()
const httpServer = createServer( app);

/* Start Socket*/
const io = new Server(httpServer, {
	cors: {
		origin: "*",
	}
});

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

io.on("connection", async (socket) => {
    const helpId = socket.handshake.query.helpId;
    console.log(`🟢 Client ${socket.id} connected with helpId:`, helpId);

    if (helpId) {
        socket.join(helpId);
        console.log(`✅ Client ${socket.id} joined room: ${helpId}`);
		let currentHelp = await redisClient.hGetAll(helpId);
		sendMessageToRoom(currentHelp.id, currentHelp);
        // List all rooms to confirm
        console.log(`🏠 Socket Rooms:`, socket.rooms);
    } else {
        console.log("❌ No helpId provided, disconnecting...");
        socket.disconnect(true);
    }
});

export function sendMessageToRoom(helpId, currentHelp) {
    if (!currentHelp) return;

    // Remove 'token' before sending
    const { token, ...currentHelpWithoutToken } = currentHelp;

    io.to(helpId).emit("message", currentHelpWithoutToken);
    console.log(`Message sent to room ${helpId}:`, currentHelpWithoutToken);
}

httpServer.listen(3000, () => {
	console.log(`Listening on port 3000`);
}); 