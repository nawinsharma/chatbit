import "dotenv/config";
import cors from "cors";
import express, { type Request, type Response } from "express";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import ChatGroupUserController from "./controllers/ChatGroupUserController";
import ChatGroupController from "./controllers/ChatGroupController";
import ChatsController from "./controllers/ChatsController";
import { Router } from "express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { setupSocket } from "./socket";
import redis from "./config/redis";
import { createAdapter } from "@socket.io/redis-streams-adapter";

const app = express();
const router = Router();

const httpServer = createServer(app);

// Socket.IO configuration with optional Redis adapter
const socketIOConfig: any = {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://chatbit.nawin.xyz",
    ],
  },
};

// Only use Redis adapter if REDIS_URL is available
if (process.env.REDIS_URL) {
  try {
    socketIOConfig.adapter = createAdapter(redis);
    console.log("✅ Using Redis adapter for Socket.IO");
  } catch (error) {
    console.warn("⚠️ Failed to create Redis adapter, using in-memory adapter:", error);
  }
} else {
  console.log("ℹ️ No REDIS_URL provided, using in-memory adapter for Socket.IO");
}

const io = new SocketIOServer(httpServer, socketIOConfig);
setupSocket(io);

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://chatbit.nawin.xyz",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.all("/api/auth{/*path}", toNodeHandler(auth));

app.use(express.json());

app.use("/api", router);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("OK");
});

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Chat Group Routes
router.get("/chat-group", ChatGroupController.index);
router.get("/chat-group/:id", ChatGroupController.show);
router.post("/chat-group", ChatGroupController.store);
router.put("/chat-group/:id", ChatGroupController.update);
router.delete("/chat-group/:id", ChatGroupController.destroy);

// * Chat group user
router.get("/chat-group-user", ChatGroupUserController.index);
router.post("/chat-group-user", ChatGroupUserController.store);

// * Chats
router.get("/chats/:groupId", ChatsController.index);

const port = parseInt(process.env.PORT || "8080", 10);

console.log(`🚀 Starting server...`);
console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`🔌 Port: ${port}`);
console.log(`🌐 Binding to: 0.0.0.0`);

httpServer.listen(port, "0.0.0.0", () => {
  // await connectKafkaProducer();
  console.log(`✅ Server and Socket.IO running on port ${port}`);
  console.log(`🌍 Server is accessible at: http://0.0.0.0:${port}`);
});

// Add error handling for the server
httpServer.on('error', (error) => {
  console.error('❌ Server error:', error);
  process.exit(1);
});
