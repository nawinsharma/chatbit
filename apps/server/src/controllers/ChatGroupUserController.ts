import { type Request, type Response } from "express";
import { auth } from "@/lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";
import prisma from "@/lib/prisma.js";
interface GroupUserType {
  name: string;
  group_id: string;
}

class ChatGroupUserController {
  // Helper function to clean up duplicate users in a group
  static async cleanupDuplicateUsers(group_id: string) {
    try {
      // Get all users for this group
      const allUsers = await prisma.groupUsers.findMany({
        where: { group_id },
        orderBy: { created_at: 'asc' } // Keep the oldest entry
      });

      // Group by name (case-insensitive)
      const usersByName = new Map<string, typeof allUsers>();
      
      allUsers.forEach((user: any) => {
        const normalizedName = user.name.toLowerCase().trim();
        if (!usersByName.has(normalizedName)) {
          usersByName.set(normalizedName, []);
        }
        usersByName.get(normalizedName)!.push(user);
      });

      // Remove duplicates (keep the first/oldest entry)
      const duplicatesToDelete: number[] = [];
      usersByName.forEach((users, name) => {
        if (users.length > 1) {
          // Keep the first user, mark others for deletion
          const [keepUser, ...duplicates] = users;
          console.log(`Found ${duplicates.length} duplicates for user "${name}", keeping ID ${keepUser.id}`);
          duplicatesToDelete.push(...duplicates.map((u: any) => u.id));
        }
      });

      // Delete duplicates
      if (duplicatesToDelete.length > 0) {
        await prisma.groupUsers.deleteMany({
          where: {
            id: { in: duplicatesToDelete }
          }
        });
        console.log(`Cleaned up ${duplicatesToDelete.length} duplicate user entries`);
      }

      return duplicatesToDelete.length;
    } catch (error) {
      console.error("Error cleaning up duplicates:", error);
      return 0;
    }
  }

  static async index(req: Request, res: Response) {
    try {
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });
      const user = session?.user;
      const { group_id } = req.query;
      
      // Clean up any existing duplicates before returning the list
      await ChatGroupUserController.cleanupDuplicateUsers(group_id as string);
      
      const users = await prisma.groupUsers.findMany({
        where: {
          group_id: group_id as string,
        },
        orderBy: {
          created_at: 'asc'
        }
      });

      return res.json({ message: "Data fetched successfully!", data: users });
    } catch (error) {
      console.error("Error fetching group users:", error);
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again!" });
    }
  }

  static async store(req: Request, res: Response) {
    try {
      const body: GroupUserType = req.body;
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });
      const user = session?.user;
      
      // Clean up any existing duplicates first
      await ChatGroupUserController.cleanupDuplicateUsers(body.group_id);
      
      // Normalize the name for comparison
      const normalizedName = body.name.toLowerCase().trim();
      
      // Check for existing user with the same normalized name
      const existingUsers = await prisma.groupUsers.findMany({
        where: {
          group_id: body.group_id,
        },
      });
      
      const existingUser = existingUsers.find((u: any) => 
        u.name.toLowerCase().trim() === normalizedName
      );

      if (existingUser) {
        console.log("User already exists in group, returning existing entry:", existingUser);
        return res.json({
          message: "Welcome back!",
          data: existingUser,
        });
      }

      console.log("Creating new group user entry:", body);
      
      // Create new user only if doesn't exist
      const groupUser = await prisma.groupUsers.create({
        data: {
          name: body.name.trim(), // Ensure consistent formatting
          group_id: body.group_id,
        },
      });
      
      return res.json({
        message: "User added to group successfully!",
        data: groupUser,
      });
    } catch (error) {
      console.error("GroupUser creation error:", error);
      
      // Handle unique constraint violations
      if (error instanceof Error && 'code' in error && (error as any).code === 'P2002') {
        return res.status(409).json({ 
          message: "User already exists in this group" 
        });
      }
      
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again!" });
    }
  }
}

export default ChatGroupUserController;
