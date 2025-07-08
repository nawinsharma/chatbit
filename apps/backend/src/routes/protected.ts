import { Router, Request, Response } from 'express';
import authMiddleware from '../middlewares/AuthMiddleware';

// Declare the AuthUser interface inline
interface AuthUser {
  id: string;
  name: string;
  email: string;
  google_id: string;
  image?: string;
}

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

const router: Router = Router();

// Protected route example
router.get('/profile', authMiddleware, (req: Request, res: Response) => {
  // req.user is now available with the authenticated user data
  res.json({
    success: true,
    message: 'Protected route accessed successfully',
    user: req.user
  });
});

// Another protected route example
router.post('/chat-groups', authMiddleware, (req: Request, res: Response) => {
  // Create a chat group for the authenticated user
  res.json({
    success: true,
    message: 'Chat group creation endpoint',
    userId: req.user?.id
  });
});

export default router; 