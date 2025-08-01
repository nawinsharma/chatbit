FROM node:20-bullseye as builder

RUN mkdir app

WORKDIR /app

COPY . .

RUN npm install --frozen-lockfile

RUN npx prisma generate

RUN npx tsc


FROM node:20-alpine as engine-builder

WORKDIR /app

COPY --chown=node:node --from=builder /app/prisma/schema.prisma ./prisma/
COPY --from=builder /app/package.json .
RUN npm install --production
RUN npx prisma generate --schema=./prisma/schema.prisma


FROM node:20-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

    COPY --chown=node:node --from=builder /app/package.json .

COPY --chown=node:node --from=builder /app/dist .
COPY --chown=node:node --from=builder /app/prisma ./prisma

RUN npm install --production

COPY --chown=node:node --from=engine-builder  /app/node_modules/.prisma/client ./node_modules/.prisma/client

EXPOSE 4500

CMD ["node", "src/index.js"]
