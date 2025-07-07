import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader === null || authHeader === undefined) {
    return res.status(401).json({ status: 401, message: "UnAuthorized" });
  }
  const token = authHeader.split(" ")[1]!;

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ status: 500, message: "JWT_SECRET not configured" });
  }

  const jwtSecret = process.env.JWT_SECRET || "secret";

  //   * Verify the JWT token
  jwt.verify(token, jwtSecret, (err: any, user: any) => {
    if (err)
      return res.status(401).json({ status: 401, message: "UnAuthorized" });
    req.user = user as AuthUser;
    next();
  });
};

export default authMiddleware;
