import { type Request, type Response } from "express";
import prisma from "@/lib/prisma.js";
import { auth } from "@/lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";

class ChatGroupController {
  static async index(req: Request, res: Response) {
    try {
      console.log("Headers received:", req.headers);
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });
      console.log("Session retrieved:", session);
      const user = session?.user;
      console.log("User from session:", user);
      
      // Check if user is authenticated
      if (!user || !user.id) {
        return res.status(401).json({ message: "Unauthorized: No valid user session found." });
      }
      
      const groups = await prisma.chatGroup.findMany({
        where: {
          user_id: user.id,
        },
        orderBy: {
          created_at: "desc",
        },
      });
      return res.json({ data: groups });
    } catch (error) {
      console.error("Error in ChatGroupController.index:", error);
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (id) {
        const group = await prisma.chatGroup.findUnique({
          where: {
            id: id,
          },
        });
        return res.json({ data: group });
      }

      return res.status(404).json({ message: "No groups found" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }

  static async store(req: Request, res: Response) {
    try {
      const body = req.body;
      console.log("Store request headers:", req.headers);
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });
      console.log("Store session retrieved:", session);
      const user = session?.user;
      console.log("Store user from session:", user);
      if (!user || !user.id) {
        return res.status(401).json({ message: "Unauthorized: No valid user session found." });
      }
      if (!body?.title || !body?.passcode) {
        return res.status(400).json({ message: "Missing required fields: title and passcode are required." });
      }
      await prisma.chatGroup.create({
        data: {
          title: body.title,
          passcode: body.passcode,
          user: { connect: { id: user.id } },
        },
      });
      return res.json({ message: "Chat Group created successfully!" });
    } catch (error) {
      console.error("Create ChatGroup error:", error);
      return res
        .status(500)
        .json({ message: "Internal server error. Please contact support if this persists." });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const body = req.body;
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });
      const user = session?.user;
      
      // Check if user is authenticated
      if (!user || !user.id) {
        return res.status(401).json({ message: "Unauthorized: No valid user session found." });
      }
      
      if (id) {
        await prisma.chatGroup.update({
          data: body,
          where: {
            id: id,
            user_id: user.id,
          },
        });
        return res.json({ message: "Group updated successfully!" });
      }

      return res.status(404).json({ message: "No groups found" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });
      const user = session?.user;
      
      // Check if user is authenticated
      if (!user || !user.id) {
        return res.status(401).json({ message: "Unauthorized: No valid user session found." });
      }
      
      await prisma.chatGroup.delete({
        where: {
          id: id,
          user_id: user.id,
        },
      });
      return res.json({ message: "Chat Group Deleted successfully!" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }
}

export default ChatGroupController;
