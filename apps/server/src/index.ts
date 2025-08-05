import "dotenv/config";
import cors from "cors";
import express, { type Request, type Response } from "express";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import ChatGroupUserController from "./controllers/ChatGroupUserController";
import ChatGroupController from "./controllers/ChatGroupController";
import ChatsController from "./controllers/ChatsController";
import { Router } from "express";

const app = express();
const router = Router();

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

app.get("/ping", (_req: Request, res: Response) => {
  res.status(200).send("pong");
});

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

console.log(`🚀 Starting Express server...`);
console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`🔌 Port: ${port}`);

// Start Express server directly
app.listen(port, "localhost", () => {
  console.log(`✅ Express server running on port ${port}`);
  console.log(`🌍 Server is accessible at: http://localhost:${port}`);
  console.log(`🔗 Health check available at: http://localhost:${port}/health`);
  console.log(`🏓 Ping endpoint available at: http://localhost:${port}/ping`);
  console.log(`✅ Ready endpoint available at: http://localhost:${port}/ready`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Received SIGINT, shutting down gracefully...');
  process.exit(0);
});