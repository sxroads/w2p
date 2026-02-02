export type GameId = 'HERD_MENTALITY';

export type Phase = 'LOBBY' | 'IN_ROUND' | 'REVEAL';

export interface Player {
  id: string;
  name: string;
  token: string;
  score: number;
}

export interface Room {
  code: string;
  hostId: string;
  players: Player[];
  gameId: GameId | null;
  phase: Phase;
  roundState: unknown;
  createdAt: number;
}

export interface Action {
  type: string;
  payload: unknown;
}

export type RoomState = Room;

