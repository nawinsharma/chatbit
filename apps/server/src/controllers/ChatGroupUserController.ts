import { type Request, type Response } from "express";
import { auth } from "@/lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";
import prisma from "@/lib/prisma.js";
interface GroupUserType {
  name: string;
  group_id: string;
}

class ChatGroupUserController {
  static async index(req: Request, res: Response) {
    try {
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });
      const user = session?.user;
      const { group_id } = req.query;
      const users = await prisma.groupUsers.findMany({
        where: {
          group_id: group_id as string,
        },
      });

      return res.json({ message: "Date fetched successfully!", data: users });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }

  static async store(req: Request, res: Response) {
    try {
      const body: GroupUserType = req.body;
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });
      const user = session?.user;
      const groupUser = await prisma.groupUsers.create({
        data: {
          ...body,
        },
      });
      return res.json({
        message: "User added to group successfully!",
        data: groupUser,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }
}

export default ChatGroupUserController;
