import { type Request, type Response } from "express";
import prisma from "@/lib/prisma.js";
import { auth } from "@/lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";

class ChatsController {
  static async index(req: Request, res: Response) {
    const { groupId } = req.params;
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    const user = session?.user;
    const chats = await prisma.chats.findMany({
      where: {
        group_id: groupId,
      },
    });
    return res.json({ data: chats });
  }
}

export default ChatsController;
