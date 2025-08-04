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
      "https://chat-server-latest.onrender.com",
    ],
  },
};

// Only use Redis adapter if REDIS_URL is available and Redis is connected
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
      "https://chat-server-latest.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.all("/api/auth{/*path}", toNodeHandler(auth));

app.use(express.json());

app.use("/api", router);

// Enhanced health check endpoint for Render - responds immediately
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ 
    message: "Server is running!",
    timestamp: new Date().toISOString(),
    port: process.env.PORT || "8080",
    environment: process.env.NODE_ENV || "development",
    status: "healthy"
  });
});

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    port: process.env.PORT || "8080",
    environment: process.env.NODE_ENV || "development",
    memory: process.memoryUsage(),
    pid: process.pid
  });
});

// Additional health check endpoint for Render
app.get("/ping", (_req: Request, res: Response) => {
  res.status(200).send("pong");
});

// Simple readiness check
app.get("/ready", (_req: Request, res: Response) => {
  res.status(200).json({ 
    status: "ready",
    timestamp: new Date().toISOString()
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

// Ensure the server starts immediately
const server = httpServer.listen(port, "0.0.0.0", () => {
  console.log(`✅ Server and Socket.IO running on port ${port}`);
  console.log(`🌍 Server is accessible at: http://0.0.0.0:${port}`);
  console.log(`🔗 Health check available at: http://0.0.0.0:${port}/health`);
  console.log(`🏓 Ping endpoint available at: http://0.0.0.0:${port}/ping`);
  console.log(`✅ Ready endpoint available at: http://0.0.0.0:${port}/ready`);
});

// Add error handling for the server
server.on('error', (error) => {
  console.error('❌ Server error:', error);
  process.exit(1);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Received SIGTERM, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 Received SIGINT, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
