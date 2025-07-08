# Authentication Setup Guide

This guide explains how to set up authentication between your Next.js client and Express backend using Better Auth.

## Overview

The setup uses Better Auth for both client and backend authentication, with a shared Prisma database. The client authenticates users and sends session tokens to the backend, which verifies them using Better Auth's session management.

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js       │    │   Express       │    │   PostgreSQL    │
│   Client        │    │   Backend       │    │   Database      │
│                 │    │                 │    │                 │
│ • Better Auth   │◄──►│ • Better Auth   │◄──►│ • Shared Schema │
│ • Session Mgmt  │    │ • Auth Middleware│    │ • User/Session  │
│ • API Client    │    │ • Protected     │    │   Tables        │
│                 │    │   Routes        │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Setup Instructions

### 1. Environment Variables

#### Client (.env.local)
```bash
# Better Auth Configuration
BETTER_AUTH_URL=http://localhost:3000/auth
BETTER_AUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database
DATABASE_URL="postgresql://postgres:chatapp@localhost:5432/postgres?schema=public"

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080
```

#### Backend (.env)
```bash
# Better Auth Configuration
BETTER_AUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database
DATABASE_URL="postgresql://postgres:chatapp@localhost:5432/postgres?schema=public"

# Server Configuration
PORT=8080
```

### 2. Database Setup

1. Ensure your PostgreSQL database is running
2. Run Prisma migrations:
   ```bash
   cd packages/db
   npx prisma migrate dev
   ```

### 3. Starting the Services

1. Start the backend:
   ```bash
   cd apps/backend
   pnpm dev
   ```

2. Start the client:
   ```bash
   cd apps/client
   pnpm dev
   ```

## How It Works

### Authentication Flow

1. **User Login**: User logs in through the Next.js client using Better Auth
2. **Session Creation**: Better Auth creates a session and stores it in the database
3. **Token Retrieval**: Client retrieves the session token using `authClient.getSession()`
4. **API Request**: Client includes the token in the Authorization header
5. **Token Verification**: Backend middleware verifies the token using Better Auth
6. **Route Access**: If valid, the user data is attached to the request and the route is accessible

### Code Examples

#### Client-Side API Call
```typescript
import { api } from '../lib/api-client';

// Get user profile from protected route
const profile = await api.getProfile();

// Create a chat group
const result = await api.createChatGroup({
  title: 'My Chat Group',
  passcode: '123456'
});
```

#### Backend Protected Route
```typescript
import { Router } from 'express';
import authMiddleware from '../middlewares/AuthMiddleware';

const router = Router();

router.get('/profile', authMiddleware, (req, res) => {
  // req.user contains the authenticated user data
  res.json({
    success: true,
    user: req.user
  });
});
```

## API Endpoints

### Available Protected Routes

- `GET /api/profile` - Get user profile
- `POST /api/chat-groups` - Create a new chat group

### Adding New Protected Routes

1. Create a new route file in `apps/backend/src/routes/`
2. Import and use the `authMiddleware`
3. Add the route to the main server file
4. Create corresponding API functions in the client

## Security Features

- **Session-based Authentication**: Uses Better Auth's secure session management
- **Token Verification**: Backend verifies tokens against the database
- **CORS Configuration**: Properly configured for cross-origin requests
- **Rate Limiting**: Built into Better Auth configuration
- **Type Safety**: Full TypeScript support throughout the stack

## Troubleshooting

### Common Issues

1. **"No active session found"**: User is not logged in or session has expired
2. **"Authorization header missing"**: Token not being sent with request
3. **"Invalid or expired session"**: Session token is invalid or expired
4. **CORS errors**: Check that the backend CORS configuration matches your client URL

### Debug Steps

1. Check that both client and backend are running
2. Verify environment variables are set correctly
3. Ensure database is accessible and migrations are up to date
4. Check browser network tab for request/response details
5. Verify Better Auth configuration in both client and backend

## Production Considerations

1. **Environment Variables**: Use strong, unique secrets in production
2. **HTTPS**: Always use HTTPS in production
3. **Domain Configuration**: Update CORS origins and Better Auth URLs
4. **Database**: Use a production-grade database with proper backups
5. **Monitoring**: Add logging and monitoring for authentication events 