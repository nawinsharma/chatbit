# Authentication Testing Guide

This guide will help you test the authentication setup between your Next.js client and Express backend.

## Prerequisites

1. **Database**: Make sure your PostgreSQL database is running and migrations are applied
2. **Environment Variables**: Set up your `.env` files (see `AUTHENTICATION_SETUP.md`)

## Quick Test Commands

### 1. Test Backend API (No Authentication Required)

```bash
# Run the test script
./test-api.sh
```

This will test:
- ✅ Base endpoint (should work)
- ❌ Protected endpoints without auth (should fail with 401)
- ❌ Protected endpoints with invalid auth (should fail with 401)

### 2. Manual API Testing

```bash
# Test base endpoint
curl http://localhost:8080

# Test protected endpoint without auth (should fail)
curl http://localhost:8080/api/profile

# Test protected endpoint with invalid token (should fail)
curl -H "Authorization: Bearer invalid-token" http://localhost:8080/api/profile
```

## Full Authentication Testing

### Step 1: Start Both Services

```bash
# Terminal 1: Start Backend
cd apps/backend
pnpm dev

# Terminal 2: Start Client
cd apps/client
pnpm dev
```

### Step 2: Test Authentication Flow

1. **Open your browser** and go to `http://localhost:3000`
2. **Log in** using Better Auth (email/password or Google OAuth)
3. **Navigate to** `http://localhost:3000/test-auth`
4. **Use the test buttons** to verify authentication

### Step 3: Test Protected Routes

On the test page, you can:

1. **Check Session**: Verify your authentication status
2. **Test Profile API**: Call the protected `/api/profile` endpoint
3. **Create Chat Group**: Test the protected `/api/chat-groups` endpoint

## Expected Results

### When NOT Authenticated:
- ❌ "No active session found" error
- ❌ 401 Unauthorized responses
- ❌ Authentication errors in the UI

### When Authenticated:
- ✅ Session data displayed
- ✅ Profile information returned
- ✅ Chat group creation successful
- ✅ User data available in requests

## Debugging Common Issues

### 1. "No active session found"
- **Cause**: User is not logged in
- **Solution**: Log in through the client first

### 2. "Authorization header missing"
- **Cause**: Token not being sent with request
- **Solution**: Check that `authClient.getSession()` returns valid data

### 3. "Invalid or expired session"
- **Cause**: Session token is invalid or expired
- **Solution**: Log out and log back in

### 4. CORS Errors
- **Cause**: Backend CORS configuration doesn't match client URL
- **Solution**: Check CORS settings in `apps/backend/src/index.ts`

### 5. Database Connection Issues
- **Cause**: Database not running or connection string incorrect
- **Solution**: Check database status and environment variables

## Manual Testing with Real Token

If you want to test with a real session token:

1. **Get the token** from browser dev tools:
   - Open Network tab
   - Make a request to a protected endpoint
   - Copy the Authorization header value

2. **Test with curl**:
```bash
curl -H "Authorization: Bearer YOUR_ACTUAL_TOKEN" http://localhost:8080/api/profile
```

## Monitoring

### Backend Logs
Watch the backend console for:
- Authentication middleware logs
- Session verification messages
- Error details

### Client Logs
Check browser console for:
- API request/response details
- Authentication errors
- Network request failures

## Performance Testing

### Load Testing Protected Routes
```bash
# Test multiple concurrent requests (requires authentication)
for i in {1..10}; do
  curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8080/api/profile &
done
wait
```

## Security Testing

### Test Invalid Scenarios:
1. **No Authorization header**
2. **Invalid token format**
3. **Expired session token**
4. **Malformed requests**

All should return 401 Unauthorized responses.

## Next Steps

Once testing is complete:

1. **Add more protected routes** following the same pattern
2. **Implement role-based access control** if needed
3. **Add rate limiting** for production
4. **Set up monitoring and logging**
5. **Deploy to production** with proper environment variables 