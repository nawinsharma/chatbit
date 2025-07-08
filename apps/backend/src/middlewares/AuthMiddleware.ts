import { Request, Response, NextFunction } from "express";
import prisma from "@repo/db/client";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get the session token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        status: 401, 
        message: "Authorization header missing or invalid" 
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ 
        status: 401, 
        message: "Token missing" 
      });
    }

    // Verify the session by checking the database directly
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!session || session.expiresAt < new Date()) {
      return res.status(401).json({ 
        status: 401, 
        message: "Invalid or expired session" 
      });
    }

    // Attach user data to the request
    req.user = {
      id: session.user.id,
      name: session.user.name || '',
      email: session.user.email,
      google_id: '', // You can populate this if needed
      image: session.user.image || undefined
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ 
      status: 401, 
      message: "Authentication failed" 
    });
  }
};

export default authMiddleware;
