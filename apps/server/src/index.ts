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
import { redis } from "./config/redis";
import { createAdapter } from "@socket.io/redis-streams-adapter";
const app = express();
const router = Router();

const httpServer = createServer(app);

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      process.env.CORS_ORIGIN || "http://localhost:3000",
    ],
  },
  adapter: createAdapter(redis),
});
setupSocket(io);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "",
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

const port = process.env.PORT || 8080;

httpServer.listen(port, async () => {
  // await connectKafkaProducer();
  console.log(`Server and Socket.IO running on port ${port}`);
});
