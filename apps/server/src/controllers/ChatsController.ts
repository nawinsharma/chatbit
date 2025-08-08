import { type Request, type Response } from "express";
import prisma from "@/lib/prisma.js";
import { auth } from "@/lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";

class ChatsController {
  static async index(req: Request, res: Response) {
    try {
      const { groupId } = req.params;
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });
      const user = session?.user;
      
      // Verify that the chat group exists
      const groupExists = await prisma.chatGroup.findUnique({
        where: {
          id: groupId,
        },
      });
      
      if (!groupExists) {
        return res.status(404).json({ message: "Chat group not found." });
      }
      
      // For fetching chats, we allow access to anyone who can see the group
      // The actual authorization happens when they try to join the group
      
      const chats = await prisma.chats.findMany({
        where: {
          group_id: groupId,
        },
        orderBy: {
          created_at: 'asc',
        },
      });
      return res.json({ data: chats });
    } catch (error) {
      console.error("Error in ChatsController.index:", error);
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again!" });
    }
  }
}

export default ChatsController;
