import { Server, Socket } from "socket.io";
import { produceMessage } from "./helper";
import prisma from "./lib/prisma";

interface CustomSocket extends Socket {
  room?: string;
}
export function setupSocket(io: Server) {
  io.use((socket: CustomSocket, next) => {
    const room = socket.handshake.auth.room || socket.handshake.headers.room;
    if (!room) {
      return next(new Error("Invalid room"));
    }
    socket.room = room;
    next();
  });

  io.on("connection", (socket: CustomSocket) => {
    // * Join the room
    if (socket.room) {
      socket.join(socket.room);
    }

    socket.on("message", async (data) => {
      // Save to DB
      try {
        await prisma.chats.create({ data });
      } catch (err) {
        console.error("Failed to save chat message to DB:", err);
      }
      if (socket.room) {
        socket.to(socket.room).emit("message", data);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
}
