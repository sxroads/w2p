import { randomBytes } from 'crypto';
import { randomUUID } from 'crypto';
import type { Player } from '@w2p/shared';

const playerTokens = new Map<string, string>();

export function createPlayer(name: string): { playerId: string; token: string } {
  const playerId = randomUUID();
  const token = randomBytes(32).toString('hex');
  playerTokens.set(playerId, token);
  return { playerId, token };
}

export function validateToken(playerId: string, token: string): boolean {
  const storedToken = playerTokens.get(playerId);
  return storedToken === token;
}

export function createPlayerObject(id: string, name: string, token: string): Player {
  return {
    id,
    name,
    token,
    score: 0,
  };
}

