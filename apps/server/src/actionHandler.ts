import type { Room, Action } from '@w2p/shared';
import { getGameEngine } from './games/index.js';
import { updateRoom } from './rooms.js';

export interface ActionError {
  message: string;
}

export function handleAction(
  room: Room,
  action: Action,
  playerId: string
): { room: Room | null; error: ActionError | null } {
  const player = room.players.find((p) => p.id === playerId);
  if (!player) {
    return { room: null, error: { message: 'Player not in room' } };
  }

  const isHost = room.hostId === playerId;

  // Handle START_GAME action
  if (action.type === 'START_GAME') {
    if (!isHost) {
      return { room: null, error: { message: 'Only host can start game' } };
    }
    if (room.phase !== 'LOBBY') {
      return { room: null, error: { message: 'Game already started' } };
    }

    const { gameId } = action.payload as { gameId: string };
    if (!gameId) {
      return { room: null, error: { message: 'Game ID required' } };
    }

    const engine = getGameEngine(gameId as any);
    if (!engine) {
      return { room: null, error: { message: 'Invalid game ID' } };
    }

    const roundState = engine.init();
    const updatedRoom = updateRoom(room.code, (r) => {
      r.gameId = gameId as any;
      r.phase = 'IN_ROUND';
      r.roundState = roundState;
    });

    return { room: updatedRoom, error: null };
  }

  // Handle game-specific actions
  if (!room.gameId) {
    return { room: null, error: { message: 'No game started' } };
  }

  const engine = getGameEngine(room.gameId);
  if (!engine) {
    return { room: null, error: { message: 'Game engine not found' } };
  }

  // Validate phase for specific actions
  if (action.type === 'SUBMIT_ANSWER') {
    if (room.phase !== 'IN_ROUND') {
      return { room: null, error: { message: 'Not in round phase' } };
    }
  } else if (action.type === 'REVEAL') {
    if (room.phase !== 'IN_ROUND') {
      return { room: null, error: { message: 'Not in round phase' } };
    }
    if (!isHost) {
      return { room: null, error: { message: 'Only host can reveal' } };
    }
  } else if (action.type === 'NEXT_TRY') {
    if (room.phase !== 'REVEAL') {
      return { room: null, error: { message: 'Not in reveal phase' } };
    }
    if (!isHost) {
      return { room: null, error: { message: 'Only host can start next try' } };
    }
  } else if (action.type === 'NEXT_ROUND') {
    if (room.phase !== 'REVEAL') {
      return { room: null, error: { message: 'Not in reveal phase' } };
    }
    if (!isHost) {
      return { room: null, error: { message: 'Only host can start next round' } };
    }
  }

  // Apply reducer
  const gameContext = {
    room,
    playerId,
    isHost,
  };

  const newRoundState = engine.reduce(room.roundState, action, gameContext);

  // Update phase if needed
  let newPhase = room.phase;
  if (action.type === 'REVEAL') {
    newPhase = 'REVEAL';
  } else if (action.type === 'NEXT_TRY' || action.type === 'NEXT_ROUND') {
    newPhase = 'IN_ROUND';
  }

  // Update player scores from round state if available
  const updatedRoom = updateRoom(room.code, (r) => {
    r.roundState = newRoundState;
    r.phase = newPhase;

    // Update scores from round state
    if (newRoundState && typeof newRoundState === 'object' && 'scores' in newRoundState) {
      const scores = (newRoundState as { scores: Record<string, number> }).scores;
      for (const player of r.players) {
        if (scores[player.id] !== undefined) {
          player.score = scores[player.id];
        }
      }
    }
  });

  return { room: updatedRoom, error: null };
}

