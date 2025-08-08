# 🚀 Chatbit - Scalable Real Time Group Chat Platform 

<div align="center">

![Chatbit Logo](https://img.shields.io/badge/Chatbit-Next%20Gen%20Chat-blue?style=for-the-badge&logo=chat)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-231F20?style=for-the-badge&logo=apache-kafka&logoColor=white)


**Connect instantly, scale infinitely. Build powerful group conversations with enterprise-grade architecture.**

[Live Demo](https://chatbit.nawin.xyz) • [Documentation](https://github.com/nawinsharma/chatbit) • [Report Bug](https://github.com/nawinsharma/scalable-chatapp/issues)
• [Video](https://ik.imagekit.io/3phdnlhoo3/compressed-video.mp4?updatedAt=1754672676873)

</div>

---

## ✨ Features

### 🎯 Core Functionality
- **Real-time Group Chat** - Instant messaging with Socket.IO
- **User Authentication** - Secure login with Better Auth
- **Group Management** - Create and manage chat groups with passcodes
- **Typing Indicators** - See who's typing in real-time
- **Message Persistence** - All messages stored in PostgreSQL
- **File Sharing** - Share files and media in conversations
- **Emoji Support** - Rich emoji picker integration
- **Responsive Design** - Works seamlessly on all devices

### 🚀 Advanced Features
- **Scalable Architecture** - Monorepo with Turbo for optimal performance
- **Real-time Notifications** - Instant message delivery
- **Redis Integration** - High-performance caching and session storage
- **Kafka Integration** - High throughput and scalability
- **Database Migrations** - Prisma ORM with automatic migrations
- **User Sessions** - Secure session management
- **Docker Support** - Containerized deployment ready
- **Health Monitoring** - Built-in health checks and monitoring

### 🎨 User Experience
- **Modern UI/UX** - Beautiful, intuitive interface with Tailwind CSS
- **Dark/Light Mode** - Theme switching with next-themes
- **Smooth Animations** - Framer Motion powered interactions
- **Mobile Responsive** - Optimized for all screen sizes
- **Accessibility** - WCAG compliant components
- **Loading States** - Elegant loading indicators
- **Error Handling** - Graceful error management

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **Socket.IO Client** - Real-time communication
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **Better Auth** - Authentication solution

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Socket.IO** - Real-time bidirectional communication
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Primary database
- **Redis** - Caching and session storage
- **Better Auth** - Authentication backend
- **TypeScript** - Type-safe backend development

### Infrastructure & DevOps
- **Turbo** - Monorepo build system
- **Docker** - Containerization
- **Render** - Cloud deployment platform
- **pnpm** - Fast package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## 🏗️ Architecture


### Real-time Communication Flow
1. **Client Connection** - Socket.IO client connects to server
2. **Room Joining** - Users join specific chat rooms
3. **Message Broadcasting** - Real-time message delivery
4. **Typing Indicators** - Live typing status updates
5. **Database Persistence** - Messages saved to PostgreSQL
6. **Session Management** - Redis-backed session storage

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- pnpm >= 8.15.6
- PostgreSQL database
- Redis instance

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/nawinsharma/scalable-chatapp.git
cd scalable-chatapp
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Environment Setup**
```bash
# Copy environment files
cp apps/client/.example.env apps/client/.env.local
cp apps/server/.example.env apps/server/.env
```

4. **Database Setup**
```bash
cd apps/server
pnpm db:push
```

5. **Start Development Servers**
```bash
# Start all services
pnpm dev

# Or start individually
pnpm --filter client dev
pnpm --filter server dev
```

### Environment Variables

#### Client (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### Server (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/chatbit
REDIS_URL=redis://localhost:6379
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000
PORT=8080
```

---

## 🐳 Docker Deployment

### Using Docker Compose
```bash
cd apps/server
docker-compose up -d
```

### Production Build
```bash
# Build all packages
pnpm build

# Start production server
pnpm --filter server start
```

---

## 📊 Performance & Scalability

### Optimization Features
- **Turbo Build System** - Incremental builds and caching
- **Socket.IO Redis Adapter** - Horizontal scaling support
- **Database Indexing** - Optimized queries with Prisma
- **CDN Ready** - Static asset optimization
- **Lazy Loading** - Component and route optimization
- **Bundle Splitting** - Efficient code splitting

### Monitoring & Health Checks
- **Health Endpoints** - `/health`, `/ping`, `/ready`
- **Memory Usage** - Process monitoring
- **Uptime Tracking** - Server status monitoring
- **Error Logging** - Comprehensive error tracking

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Quality
- **TypeScript** - Strict type checking
- **ESLint** - Code linting and formatting
- **Prettier** - Consistent code formatting
- **Turbo** - Fast, incremental builds

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Socket.IO** - Real-time communication library
- **Prisma Team** - Database toolkit
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives

---

<div align="center">

**Built with ❤️ by [Nawin Sharma](https://github.com/nawinsharma)**

**⭐ Star this repository if you found it helpful!**

</div>
