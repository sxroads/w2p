import { Server as SocketIOServer } from 'socket.io';
import { createServer as createHttpServer } from 'http';
import { createPlayer, validateToken } from './players.js';
import { createRoom, getRoom, joinRoom, leaveRoom } from './rooms.js';
import { handleAction } from './actionHandler.js';
import type { Action } from '@w2p/shared';

const httpServer = createHttpServer();
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Map socket.id to playerId
const socketToPlayer = new Map<string, { playerId: string; roomCode: string }>();

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('create:room', (data: { name: string; gameId?: string }) => {
    const { name, gameId } = data;

    if (!name) {
      socket.emit('error', { message: 'Name required' });
      return;
    }

    const newPlayer = createPlayer(name);
    const room = createRoom(newPlayer.playerId, name, newPlayer.token, gameId || null);

    socketToPlayer.set(socket.id, { playerId: newPlayer.playerId, roomCode: room.code });
    socket.join(room.code);

    socket.emit('join:success', { playerId: newPlayer.playerId, token: newPlayer.token });
    socket.emit('room:state', room);
  });

  socket.on('join', (data: { code: string; playerId?: string; token?: string; name?: string }) => {
    const { code, playerId: providedPlayerId, token, name } = data;

    if (!code || code.length !== 6) {
      socket.emit('error', { message: 'Invalid room code' });
      return;
    }

    let playerId: string;
    let playerToken: string;
    let playerName: string;

    if (providedPlayerId && token) {
      // Reconnection attempt
      if (!validateToken(providedPlayerId, token)) {
        socket.emit('error', { message: 'Invalid token' });
        return;
      }
      playerId = providedPlayerId;
      playerToken = token;
      playerName = name || 'Player';
    } else {
      // New player
      if (!name) {
        socket.emit('error', { message: 'Name required for new player' });
        return;
      }
      const newPlayer = createPlayer(name);
      playerId = newPlayer.playerId;
      playerToken = newPlayer.token;
      playerName = name;
      socket.emit('join:success', { playerId, token: playerToken });
    }

    const room = getRoom(code);
    if (!room) {
      socket.emit('error', { message: 'Room not found' });
      return;
    }

    const updatedRoom = joinRoom(code, playerId, playerName, playerToken);
    if (!updatedRoom) {
      socket.emit('error', { message: 'Failed to join room' });
      return;
    }

    socketToPlayer.set(socket.id, { playerId, roomCode: code });
    socket.join(code);

    // Send current room state
    socket.emit('room:state', updatedRoom);
    io.to(code).emit('room:state', updatedRoom);
  });

  socket.on('game:action', (action: Action) => {
    const playerInfo = socketToPlayer.get(socket.id);
    if (!playerInfo) {
      socket.emit('error', { message: 'Not joined to a room' });
      return;
    }

    const room = getRoom(playerInfo.roomCode);
    if (!room) {
      socket.emit('error', { message: 'Room not found' });
      return;
    }

    const result = handleAction(room, action, playerInfo.playerId);
    if (result.error) {
      socket.emit('error', result.error);
      return;
    }

    if (result.room) {
      io.to(playerInfo.roomCode).emit('room:state', result.room);
    }
  });

  socket.on('disconnect', () => {
    const playerInfo = socketToPlayer.get(socket.id);
    if (playerInfo) {
      const room = leaveRoom(playerInfo.roomCode, playerInfo.playerId);
      if (room) {
        io.to(playerInfo.roomCode).emit('room:state', room);
      }
      socketToPlayer.delete(socket.id);
    }
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;

httpServer.on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please kill the process using this port or use a different port.`);
    console.error(`To find and kill the process: lsof -ti :${PORT} | xargs kill -9`);
    process.exit(1);
  } else {
    console.error('Server error:', error);
    process.exit(1);
  }
});

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});

