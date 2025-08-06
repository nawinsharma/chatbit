import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (auth?: Record<string, unknown>) => {
  // If we have auth parameters and no socket exists, or if auth has changed, create a new socket
  if (!socket || (auth && JSON.stringify(socket.auth) !== JSON.stringify(auth))) {
    if (socket) {
      socket.disconnect();
    }
    
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    console.log('Connecting to socket server at:', backendUrl);
    
    socket = io(backendUrl, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      forceNew: true,
      transports: ['websocket', 'polling'],
      upgrade: true,
      rememberUpgrade: true,
      withCredentials: true,
      auth: auth || {}
    });

    // Add comprehensive event listeners for debugging
    socket.on('connect', () => {
      console.log('✅ Socket connected successfully to', backendUrl);
      console.log('Socket ID:', socket?.id);
      console.log('Socket auth:', socket?.auth);
    });

    socket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error.message);
      console.error('Error details:', error);
    });

    socket.on('disconnect', (reason, details) => {
      console.log('🔌 Socket disconnected:', reason);
      if (details) console.log('Disconnect details:', details);
    });

    socket.on('reconnect_attempt', (attemptNumber) => {
      console.log(`🔄 Reconnection attempt ${attemptNumber}`);
    });

    socket.on('reconnect', (attemptNumber) => {
      console.log(`✅ Reconnected after ${attemptNumber} attempts`);
    });

    socket.on('reconnect_failed', () => {
      console.error('❌ Failed to reconnect to socket server after all attempts');
    });

    socket.on('error', (error) => {
      console.error('🚨 Socket error:', error);
    });
  }
  
  return socket;
};
