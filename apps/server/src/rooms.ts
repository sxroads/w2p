import type { Room, GameId, Player } from '@w2p/shared';
import { createPlayerObject } from './players.js';

const rooms = new Map<string, Room>();

function generateRoomCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export function createRoom(hostId: string, hostName: string, hostToken: string, gameId: GameId | null = null): Room {
  let code: string;
  do {
    code = generateRoomCode();
  } while (rooms.has(code));

  const host: Player = createPlayerObject(hostId, hostName, hostToken);

  const room: Room = {
    code,
    hostId,
    players: [host],
    gameId,
    phase: 'LOBBY',
    roundState: null,
    createdAt: Date.now(),
  };

  rooms.set(code, room);
  return room;
}

export function getRoom(code: string): Room | null {
  return rooms.get(code) || null;
}

export function joinRoom(code: string, playerId: string, playerName: string, token: string): Room | null {
  const room = rooms.get(code);
  if (!room) {
    return null;
  }

  // Check if player already exists
  const existingPlayer = room.players.find((p) => p.id === playerId);
  if (existingPlayer) {
    // Validate token for existing player
    if (existingPlayer.token !== token) {
      return null;
    }
    return room;
  }

  // Add new player
  const newPlayer: Player = createPlayerObject(playerId, playerName, token);
  room.players.push(newPlayer);
  return room;
}

export function leaveRoom(code: string, playerId: string): Room | null {
  const room = rooms.get(code);
  if (!room) {
    return null;
  }

  room.players = room.players.filter((p) => p.id !== playerId);

  // If host left, transfer to next player
  if (room.hostId === playerId && room.players.length > 0) {
    room.hostId = room.players[0].id;
  }

  // If no players left, delete room
  if (room.players.length === 0) {
    rooms.delete(code);
    return null;
  }

  return room;
}

export function updateRoom(code: string, updater: (room: Room) => void): Room | null {
  const room = rooms.get(code);
  if (!room) {
    return null;
  }

  updater(room);
  return room;
}

