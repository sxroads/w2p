import type { GameEngine, GameContext, Action } from '@w2p/shared';
import { getRandomPrompt } from './prompts.js';

export interface HerdMentalityState {
	prompt: string;
	answers: Record<string, string>;
	previousAnswers: Record<string, string[]>; // Track all previous answers per player for this question
	scores: Record<string, number>;
	roundNumber: number;
	tryNumber: number; // 1, 2, or 3 for current question
}

export class HerdMentalityEngine implements GameEngine {
	init(): HerdMentalityState {
		return {
			prompt: getRandomPrompt(),
			answers: {},
			previousAnswers: {},
			scores: {},
			roundNumber: 1,
			tryNumber: 1,
		};
	}

	reduce(state: unknown, action: Action, ctx: GameContext): HerdMentalityState {
		const currentState = state as HerdMentalityState;

		switch (action.type) {
			case 'SUBMIT_ANSWER': {
				const { answer } = action.payload as { answer: string };
				const trimmedAnswer = answer.trim().toLowerCase();

				// Check if player has already used this answer
				const playerPreviousAnswers = currentState.previousAnswers[ctx.playerId] || [];
				if (playerPreviousAnswers.includes(trimmedAnswer)) {
					// Don't allow duplicate answers
					return currentState;
				}

				return {
					...currentState,
					answers: {
						...currentState.answers,
						[ctx.playerId]: answer.trim(),
					},
				};
			}

			case 'REVEAL': {
				// Group answers by value (case-insensitive)
				const answerGroups = new Map<string, string[]>();
				for (const [playerId, answer] of Object.entries(currentState.answers)) {
					const normalized = answer.toLowerCase().trim();
					if (!answerGroups.has(normalized)) {
						answerGroups.set(normalized, []);
					}
					answerGroups.get(normalized)!.push(playerId);
				}

				const totalPlayers = Object.keys(currentState.answers).length;
				const newScores = { ...currentState.scores };
				const newPreviousAnswers = { ...currentState.previousAnswers };

				// Update previous answers for all players
				for (const [playerId, answer] of Object.entries(currentState.answers)) {
					const normalized = answer.toLowerCase().trim();
					if (!newPreviousAnswers[playerId]) {
						newPreviousAnswers[playerId] = [];
					}
					newPreviousAnswers[playerId].push(normalized);
				}

				// Scoring logic: only award points if there's a clear herd
				// (one answer with MORE votes than any other)
				if (answerGroups.size === 0 || totalPlayers === 0) {
					// No answers submitted
					return {
						...currentState,
						previousAnswers: newPreviousAnswers,
					};
				}

				// Find largest group size
				let maxGroupSize = 0;
				for (const group of answerGroups.values()) {
					if (group.length > maxGroupSize) {
						maxGroupSize = group.length;
					}
				}

				// Count how many groups have the max size
				let groupsWithMaxSize = 0;
				for (const group of answerGroups.values()) {
					if (group.length === maxGroupSize) {
						groupsWithMaxSize++;
					}
				}

				// Check for 100% match (all players gave the same answer)
				const totalPlayersInRoom = ctx.room.players.length;
				const isPerfectMatch = answerGroups.size === 1 && maxGroupSize === totalPlayersInRoom && totalPlayers === totalPlayersInRoom;

				// Award points only if:
				// 1. There's exactly one group with the max size (clear herd)
				// 2. That group has more than 1 player (not all unique)
				if (groupsWithMaxSize === 1 && maxGroupSize > 1) {
					// Clear herd exists - award points to players in that group
					for (const [answer, playerIds] of answerGroups.entries()) {
						if (playerIds.length === maxGroupSize) {
							for (const playerId of playerIds) {
								newScores[playerId] = (newScores[playerId] || 0) + 1;
							}
							break; // Only one group should match
						}
					}
				}
				// Otherwise: all unique (maxGroupSize === 1) or tie (groupsWithMaxSize > 1) → no points

				// If 100% match, end the round by setting tryNumber to 3
				const newTryNumber = isPerfectMatch ? 3 : currentState.tryNumber;

				return {
					...currentState,
					scores: newScores,
					previousAnswers: newPreviousAnswers,
					tryNumber: newTryNumber,
				};
			}

			case 'NEXT_TRY': {
				// Move to next try (1->2, 2->3) for same question
				if (currentState.tryNumber < 3) {
					return {
						...currentState,
						answers: {},
						tryNumber: currentState.tryNumber + 1,
					};
				}
				// If already at try 3, do nothing (should call NEXT_ROUND instead)
				return currentState;
			}

			case 'NEXT_ROUND': {
				// Move to new question, reset try number and previous answers
				return {
					prompt: getRandomPrompt(),
					answers: {},
					previousAnswers: {},
					scores: currentState.scores,
					roundNumber: currentState.roundNumber + 1,
					tryNumber: 1,
				};
			}

			default:
				return currentState;
		}
	}

	view(state: unknown, _playerId: string): unknown {
		// Herd Mentality has no secrets, return full state
		return state;
	}
}

