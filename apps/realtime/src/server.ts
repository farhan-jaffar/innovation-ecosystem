import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors({ origin: '*' }));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'AI Innovation Ecosystem Realtime Server',
    activeConnections: io.engine.clientsCount,
    timestamp: new Date().toISOString()
  });
});

io.on('connection', (socket) => {
  console.log(`🔌 [Socket.io] Client connected: ${socket.id}`);

  socket.on('join_room', (roomId: string) => {
    socket.join(roomId);
    console.log(`👤 Client ${socket.id} joined room: ${roomId}`);
  });

  socket.on('leave_room', (roomId: string) => {
    socket.leave(roomId);
    console.log(`👤 Client ${socket.id} left room: ${roomId}`);
  });

  socket.on('send_message', (data: { roomId: string; sender: string; content: string }) => {
    io.to(data.roomId).emit('new_message', {
      ...data,
      timestamp: new Date().toISOString()
    });
  });

  socket.on('disconnect', () => {
    console.log(`🔌 [Socket.io] Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5001;
httpServer.listen(PORT, () => {
  console.log(`⚡ [Realtime Socket Server] running on http://localhost:${PORT}`);
});
