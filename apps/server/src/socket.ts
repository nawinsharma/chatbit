import { Server, Socket } from "socket.io";
import { produceMessage } from "./helper";
import prisma from "./lib/prisma";

interface CustomSocket extends Socket {
  room?: string;
}

// Track typing users per room with a maximum limit
const typingUsers = new Map<string, Set<string>>();
const MAX_TYPING_USERS = 50; // Limit to prevent spam and performance issues

export function setupSocket(io: Server) {
  console.log('Setting up Socket.IO server...');
  
  io.use((socket: CustomSocket, next) => {
    const room = socket.handshake.auth.room || socket.handshake.headers.room;
    console.log('Socket middleware - Room:', room, 'from:', socket.handshake.address);
    
    if (!room) {
      console.error('No room provided in socket handshake');
      return next(new Error("Invalid room"));
    }
    socket.room = room;
    next();
  });

  io.on("connection", (socket: CustomSocket) => {
    console.log(`User connected: ${socket.id} to room: ${socket.room}`);
    console.log(`Client address: ${socket.handshake.address}`);
    
    // * Join the room
    if (socket.room) {
      socket.join(socket.room);
      console.log(`Socket ${socket.id} joined room ${socket.room}`);
      
      // Emit a confirmation to the client
      socket.emit('joined_room', { room: socket.room, socketId: socket.id });
    }

    socket.on("message", async (data) => {
      console.log("Received message:", data);
      
      // Stop typing indicator when message is sent
      if (socket.room) {
        const typingSet = typingUsers.get(socket.room);
        if (typingSet) {
          typingSet.delete(data.name);
          if (typingSet.size === 0) {
            typingUsers.delete(socket.room);
          }
          // Broadcast typing stop to all users
          io.to(socket.room).emit("typing_stop", { name: data.name });
        }
      }
      
      // Save to DB
      try {
        await prisma.chats.create({ data });
        console.log("💾 Message saved to database");
      } catch (err) {
        console.error("❌ Failed to save chat message to DB:", err);
      }
      
      // Emit to all users in the room (including sender for confirmation)
      if (socket.room) {
        io.to(socket.room).emit("message", data);
        console.log(`Message emitted to room ${socket.room}`);
      }
    });

    // Handle typing start event
    socket.on("typing_start", (data: { name: string }) => {
      console.log("User started typing:", data);
      
      if (socket.room) {
        // Add user to typing set for this room
        if (!typingUsers.has(socket.room)) {
          typingUsers.set(socket.room, new Set());
        }
        
        const typingSet = typingUsers.get(socket.room)!;
        
        // Check if we're at the limit
        if (typingSet.size >= MAX_TYPING_USERS) {
          console.log(`⚠️ Typing users limit reached for room ${socket.room} (${MAX_TYPING_USERS})`);
          return; // Don't add more users to prevent spam
        }
        
        typingSet.add(data.name);
        
        // Broadcast to all users in the room (except sender)
        socket.to(socket.room).emit("typing_start", data);
        console.log(`Typing start emitted to room ${socket.room} (${typingSet.size} users typing)`);
      }
    });

    // Handle typing stop event
    socket.on("typing_stop", (data: { name: string }) => {
      console.log("⌨️ User stopped typing:", data);
      
      if (socket.room) {
        // Remove user from typing set for this room
        const typingSet = typingUsers.get(socket.room);
        if (typingSet) {
          typingSet.delete(data.name);
          if (typingSet.size === 0) {
            typingUsers.delete(socket.room);
          }
        }
        
        // Broadcast to all users in the room (except sender)
        socket.to(socket.room).emit("typing_stop", data);
        console.log(` Typing stop emitted to room ${socket.room}`);
      }
    });

    // Handle user join event
    socket.on("user_joined", async (data) => {
      console.log("👤 User joined:", data);
      
      // Emit to all users in the room (including sender for confirmation)
      if (socket.room) {
        io.to(socket.room).emit("user_joined", data);
        console.log(`📤 User joined event emitted to room ${socket.room}`);
      }
    });

    // Handle user leave event
    socket.on("user_left", async (data) => {
      console.log("👤 User left:", data);
      
      // Remove user from typing indicators if they were typing
      if (socket.room) {
        const typingSet = typingUsers.get(socket.room);
        if (typingSet) {
          typingSet.delete(data.user.name);
          if (typingSet.size === 0) {
            typingUsers.delete(socket.room);
          }
          // Broadcast typing stop for this user
          io.to(socket.room).emit("typing_stop", { name: data.user.name });
        }
      }
      
      // Emit to all users in the room
      if (socket.room) {
        io.to(socket.room).emit("user_left", data);
        console.log(`User left event emitted to room ${socket.room}`);
      }
    });

    socket.on("error", (error) => {
      console.error(`Socket error for ${socket.id}:`, error);
    });

    socket.on("disconnect", (reason, details) => {
      console.log(`🔌 User disconnected: ${socket.id}, reason: ${reason}`);
      if (details) console.log('Disconnect details:', details);
    });
  });
  
  console.log('✅ Socket.IO server setup complete');
}
