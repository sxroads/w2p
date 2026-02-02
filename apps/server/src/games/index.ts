import type { GameId, GameEngine } from '@w2p/shared';
import { HerdMentalityEngine } from './herdMentality/index.js';

const gameEngines = new Map<GameId, GameEngine>();

gameEngines.set('HERD_MENTALITY', new HerdMentalityEngine());

export function getGameEngine(gameId: GameId): GameEngine | null {
  return gameEngines.get(gameId) || null;
}

