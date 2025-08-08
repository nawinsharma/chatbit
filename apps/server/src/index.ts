import "dotenv/config";
import cors from "cors";
import express, { type Request, type Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import { setupSocket } from "./socket";
import ChatGroupUserController from "./controllers/ChatGroupUserController";
import ChatGroupController from "./controllers/ChatGroupController";
import ChatsController from "./controllers/ChatsController";
import { Router } from "express";
import { fromNodeHeaders } from "better-auth/node";

const app = express();
const router = Router();

// Create HTTP server
const httpServer = createServer(app);

// Create Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://chatbit.nawin.xyz",
      "https://chat-server-latest.onrender.com",
    ],
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling'],
  allowEIO3: true
});

// Make io instance available to controllers
app.set('io', io);

// Setup Socket.IO handlers
setupSocket(io);

app.use(
  cors({
    origin: ["https://chatbit.nawin.xyz", "http://localhost:3000", "http://127.0.0.1:3000"], // Only your frontend domain, no trailing slash
    credentials: true, // Allow cookies
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));

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

// Debug endpoint to check auth configuration
app.get("/debug/auth", (_req: Request, res: Response) => {
  res.status(200).json({
    betterAuthUrl: process.env.BETTER_AUTH_URL,
    betterAuthSecret: process.env.BETTER_AUTH_SECRET ? "SET" : "NOT SET",
    corsOrigin: process.env.CORS_ORIGIN,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Test auth endpoint
app.get("/debug/test-auth", async (req: Request, res: Response) => {
  try {
    console.log("Debug auth request headers:", req.headers);
    console.log("Debug auth request cookies:", req.headers.cookie);
    
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    res.status(200).json({
      session: session,
      headers: req.headers,
      cookies: req.headers.cookie,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Debug auth error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
      headers: req.headers,
      cookies: req.headers.cookie,
      timestamp: new Date().toISOString()
    });
  }
});

// Enhanced debug endpoint for production troubleshooting
app.get("/debug/auth-details", async (req: Request, res: Response) => {
  try {
    const authDetails: {
      environment: string | undefined;
      betterAuthUrl: string | undefined;
      corsOrigin: string | undefined;
      requestOrigin: string | undefined;
      requestReferer: string | undefined;
      cookies: string | undefined;
      userAgent: string | undefined;
      timestamp: string;
      session?: any;
      sessionError?: string;
    } = {
      environment: process.env.NODE_ENV,
      betterAuthUrl: process.env.BETTER_AUTH_URL,
      corsOrigin: process.env.CORS_ORIGIN,
      requestOrigin: req.headers.origin,
      requestReferer: req.headers.referer,
      cookies: req.headers.cookie,
      userAgent: req.headers['user-agent'],
      timestamp: new Date().toISOString()
    };
    
    // Try to get session
    try {
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });
      authDetails.session = session;
    } catch (sessionError) {
      authDetails.sessionError = sessionError instanceof Error ? sessionError.message : "Unknown session error";
    }
    
    res.status(200).json(authDetails);
  } catch (error) {
    console.error("Debug auth details error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString()
    });
  }
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

console.log(`🚀 Starting Express server with Socket.IO...`);
console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`🔌 Port: ${port}`);

// Start HTTP server (which includes both Express and Socket.IO)
httpServer.listen(port, "::", () => {
  console.log(`✅ Express server running on port ${port}`);
  console.log(`🔌 Socket.IO server running on port ${port}`);
  console.log(`🌍 Server is accessible at: http://localhost:${port}`);
  console.log(`🔗 Health check available at: http://localhost:${port}/health`);
  console.log(`🏓 Ping endpoint available at: http://localhost:${port}/ping`);
  console.log(`✅ Ready endpoint available at: http://localhost:${port}/ready`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Received SIGTERM, shutting down gracefully...');
  httpServer.close(() => {
    console.log('✅ HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 Received SIGINT, shutting down gracefully...');
  httpServer.close(() => {
    console.log('✅ HTTP server closed');
    process.exit(0);
  });
});