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
      
      // If user is authenticated, check if they have access to this chat group
      if (user && user.id) {
        const groupAccess = await prisma.chatGroup.findFirst({
          where: {
            id: groupId,
            user_id: user.id,
          },
        });
        
        const groupMembership = await prisma.groupUsers.findFirst({
          where: {
            group_id: groupId,
            name: user.name || user.email,
          },
        });
        
        if (!groupAccess && !groupMembership) {
          return res.status(403).json({ message: "Forbidden: You don't have access to this chat group." });
        }
      }
      
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
