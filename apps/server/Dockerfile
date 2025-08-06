# Use Node.js 20 Alpine for smaller image size
FROM node:20-alpine

# Install OpenSSL for Prisma compatibility
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copy package files from server directory
COPY apps/server/package.json apps/server/package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy Prisma schema and generate client
COPY apps/server/prisma ./prisma
RUN npx prisma generate

# Copy source code
COPY apps/server/ .

# Build the application
RUN npm run build

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

EXPOSE 8080

ENV NODE_ENV=production
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "dist/index.js"] 