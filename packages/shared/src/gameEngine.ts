import type { Room, Action, Player } from './types.js';

export interface GameContext {
  room: Room;
  playerId: string;
  isHost: boolean;
}

export interface GameEngine {
  init(): unknown;
  reduce(state: unknown, action: Action, ctx: GameContext): unknown;
  view(state: unknown, playerId: string): unknown;
}

