import dotenv from "dotenv";
import { createServer } from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { Message } from "./models/Message";

dotenv.config();

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/chat", {
  dbName: "chat",
});

const connectedUsers = new Map<string, string>();

io.on("connection", (socket) => {
  console.log("🟢 Utilisateur connecté :", socket.id);

  socket.on("register", (userId: string) => {
    connectedUsers.set(userId, socket.id);
    console.log(`🧑‍💻 Utilisateur ${userId} enregistré avec socket ${socket.id}`);
  });

  socket.on("sendMessage", async ({ from, to, message }) => {
    const targetSocketId = connectedUsers.get(to);
    const senderSocketId = connectedUsers.get(from);

    const newMessage = new Message({
      from,
      to,
      message,
      timestamp: new Date(),
      read: false,
    });

    await newMessage.save();

    if (targetSocketId) {
      io.to(targetSocketId).emit("receiveMessage", newMessage);
    }

    if (senderSocketId && senderSocketId !== targetSocketId) {
      io.to(senderSocketId).emit("receiveMessage", newMessage);
    }
  });

  socket.on("getMessages", async ({ fromUserId, toUserId }) => {
    const messages = await Message.find({
      $or: [
        { from: fromUserId, to: toUserId },
        { from: toUserId, to: fromUserId },
      ],
    }).sort({ timestamp: 1 });

    socket.emit("receivedMessage", messages);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Utilisateur déconnecté :", socket.id);

    const userId = Array.from(connectedUsers.entries()).find(
      ([, socketId]) => socketId === socket.id
    )?.[0];

    if (userId) {connectedUsers.delete(userId);}
  });
});

const SOCKET_PORT = process.env.SOCKET_PORT || 3001;

httpServer.listen(SOCKET_PORT, () => {
  console.log(`🧭 Serveur Socket.io lancé sur le port ${SOCKET_PORT}`);
});
