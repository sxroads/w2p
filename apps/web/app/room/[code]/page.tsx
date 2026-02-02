'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getSocket, onRoomState, onError, emitAction } from '@/lib/socket';
import type { RoomState } from '@w2p/shared';

export default function RoomPage() {
	const params = useParams();
	const router = useRouter();
	const code = params.code as string;
	const [room, setRoom] = useState<RoomState | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [answer, setAnswer] = useState('');
	const [submitted, setSubmitted] = useState(false);

	useEffect(() => {
		const playerId = localStorage.getItem('playerId');
		const token = localStorage.getItem('playerToken');
		const playerName = localStorage.getItem('playerName') || 'Player';

		if (!playerId || !token) {
			router.push('/');
			return;
		}

		const socket = getSocket();

		const unsubscribeState = onRoomState((state) => {
			setRoom(state);
			// Check if player has submitted answer
			if (state.phase === 'IN_ROUND' && state.roundState) {
				const roundState = state.roundState as { answers?: Record<string, string> };
				if (roundState.answers && roundState.answers[playerId]) {
					setSubmitted(true);
				} else {
					setSubmitted(false);
				}
			} else {
				setSubmitted(false);
			}
		});

		const unsubscribeError = onError((err) => {
			setError(err.message);
		});

		socket.emit('join', {
			code: code.toUpperCase(),
			playerId,
			token,
			name: playerName,
		});

		return () => {
			unsubscribeState();
			unsubscribeError();
		};
	}, [code, router]);

	const handleStartGame = () => {
		emitAction({
			type: 'START_GAME',
			payload: { gameId: 'HERD_MENTALITY' },
		});
	};

	const handleSubmitAnswer = () => {
		if (!answer.trim()) {
			return;
		}

		// Check if answer was already used
		if (roundState?.previousAnswers?.[playerId]) {
			const normalizedAnswer = answer.trim().toLowerCase();
			if (roundState.previousAnswers[playerId].includes(normalizedAnswer)) {
				setError('You cannot use the same answer twice!');
				return;
			}
		}

		emitAction({
			type: 'SUBMIT_ANSWER',
			payload: { answer: answer.trim() },
		});
		setSubmitted(true);
		setError(null);
	};

	const handleReveal = () => {
		emitAction({
			type: 'REVEAL',
			payload: {},
		});
	};

	const handleNextTry = () => {
		emitAction({
			type: 'NEXT_TRY',
			payload: {},
		});
		setAnswer('');
		setSubmitted(false);
	};

	const handleNextRound = () => {
		emitAction({
			type: 'NEXT_ROUND',
			payload: {},
		});
		setAnswer('');
		setSubmitted(false);
	};

	if (!room) {
		return (
			<div className="flex min-h-screen items-center justify-center relative z-10">
				<div className="text-center relative z-10 bg-white/80 backdrop-blur-sm rounded-lg px-8 py-4 shadow-lg">
					<p className="text-gray-600">Loading room...</p>
				</div>
			</div>
		);
	}

	const playerId = localStorage.getItem('playerId') || '';
	const isHost = room.hostId === playerId;
	const roundState = room.roundState as
		| {
			prompt?: string;
			answers?: Record<string, string>;
			scores?: Record<string, number>;
			tryNumber?: number;
			previousAnswers?: Record<string, string[]>;
		}
		| null;

	return (
		<div className="flex min-h-screen flex-col relative z-10">
			<div className="border-b-4 border-purple-500 px-6 py-4 bg-gradient-to-r from-purple-50/90 to-pink-50/90 backdrop-blur-sm relative z-10">
				<div className="max-w-4xl mx-auto flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-bold text-black">Room: {room.code}</h1>
						<p className="text-sm text-gray-600">
							{room.players.length} player{room.players.length !== 1 ? 's' : ''}
						</p>
					</div>
					{isHost && <span className="text-sm text-purple-600 font-semibold bg-purple-100 px-3 py-1 rounded-full border-2 border-purple-400">Host</span>}
				</div>
			</div>

			{error && (
				<div className="bg-red-100 border-2 border-red-500 text-red-700 px-4 py-3 mx-6 mt-4 rounded-lg">
					{error}
				</div>
			)}

			<div className="flex-1 max-w-4xl mx-auto w-full px-6 py-8 bg-white/60 backdrop-blur-sm rounded-lg shadow-lg my-4">
				{room.phase === 'LOBBY' && (
					<div className="space-y-6">
						<h2 className="text-xl font-semibold text-black">Players</h2>
						<div className="space-y-2">
							{room.players.map((player, index) => {
								const colors = [
									'border-blue-400 bg-blue-50',
									'border-green-400 bg-green-50',
									'border-yellow-400 bg-yellow-50',
									'border-pink-400 bg-pink-50',
									'border-purple-400 bg-purple-50',
									'border-orange-400 bg-orange-50',
								];
								const colorClass = colors[index % colors.length];
								return (
									<div
										key={player.id}
										className={`flex items-center justify-between p-4 rounded-lg border-2 ${colorClass}`}
									>
										<span className="text-gray-900 font-medium">
											{player.name} {player.id === room.hostId && <span className="text-purple-600">(Host)</span>}
										</span>
										<span className="text-gray-700 font-semibold">Score: {player.score}</span>
									</div>
								);
							})}
						</div>
						{isHost && (
							<button
								onClick={handleStartGame}
								className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg border-2 border-purple-600 hover:from-purple-600 hover:to-pink-600 transition-all font-semibold shadow-lg"
							>
								Start Game (Herd Mentality)
							</button>
						)}
					</div>
				)}

				{room.phase === 'IN_ROUND' && roundState && (
					<div className="space-y-6">
						<div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-400">
							<h2 className="text-2xl font-bold text-black mb-2">
								{roundState.prompt}
							</h2>
							<p className="text-sm text-gray-600 mb-4 font-semibold">
								Try {roundState.tryNumber || 1} of 3
							</p>
						</div>

						{roundState.previousAnswers && roundState.previousAnswers[playerId] && roundState.previousAnswers[playerId].length > 0 && (
							<div className="bg-yellow-50 border-2 border-yellow-400 p-4 rounded-lg">
								<p className="text-sm font-semibold text-yellow-900 mb-2">
									Your previous answers (can&apos;t reuse):
								</p>
								<p className="text-sm text-yellow-800">
									{roundState.previousAnswers[playerId].join(', ')}
								</p>
							</div>
						)}

						{!submitted ? (
							<div className="space-y-4">
								<input
									type="text"
									value={answer}
									onChange={(e) => setAnswer(e.target.value)}
									placeholder="Your answer..."
									className="w-full px-4 py-3 border-2 border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-600 bg-white text-black"
									onKeyDown={(e) => {
										if (e.key === 'Enter' && answer.trim()) {
											handleSubmitAnswer();
										}
									}}
								/>
								<button
									onClick={handleSubmitAnswer}
									disabled={!answer.trim()}
									className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg border-2 border-green-600 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg"
								>
									Submit Answer
								</button>
							</div>
						) : (
							<div className="text-center py-8 bg-blue-50 border-2 border-blue-400 rounded-lg">
								<p className="text-lg text-blue-800 font-semibold">
									Waiting for other players...
								</p>
							</div>
						)}

						{isHost && (
							<div className="mt-8">
								<p className="text-sm text-gray-600 mb-2 font-semibold">
									{Object.keys(roundState.answers || {}).length} / {room.players.length} answers
									submitted
								</p>
								{Object.keys(roundState.answers || {}).length === room.players.length && (
									<button
										onClick={handleReveal}
										className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg border-2 border-orange-600 hover:from-orange-600 hover:to-red-600 transition-all font-semibold shadow-lg"
									>
										Reveal Answers
									</button>
								)}
							</div>
						)}
					</div>
				)}

				{room.phase === 'REVEAL' && roundState && (
					<div className="space-y-6">
						<h2 className="text-xl font-semibold text-black">Answers</h2>

						{/* Group answers */}
						{(() => {
							const answers = roundState.answers || {};
							const answerGroups = new Map<string, string[]>();
							for (const [playerId, answer] of Object.entries(answers)) {
								const normalized = answer.toLowerCase().trim();
								if (!answerGroups.has(normalized)) {
									answerGroups.set(normalized, []);
								}
								answerGroups.get(normalized)!.push(playerId);
							}

							const maxGroupSize = Math.max(...Array.from(answerGroups.values()).map((g) => g.length), 0);
							// Count how many groups have the max size
							const groupsWithMaxSize = Array.from(answerGroups.values()).filter((g) => g.length === maxGroupSize).length;
							// Winner only if there's exactly one group with max size AND max size > 1 (clear herd, not all unique)
							const hasClearHerd = groupsWithMaxSize === 1 && maxGroupSize > 1;
							const allUnique = maxGroupSize === 1;
							const hasTie = groupsWithMaxSize > 1 && maxGroupSize > 1;
							// Check for 100% match (all players gave the same answer)
							const isPerfectMatch = answerGroups.size === 1 && maxGroupSize === room.players.length;

							return (
								<div className="space-y-4">
									{isPerfectMatch && (
										<div className="bg-green-100 border-2 border-green-500 p-4 rounded-lg">
											<p className="text-sm font-semibold text-green-800">
												🎉 Perfect Match! All players gave the same answer. Round complete!
											</p>
										</div>
									)}
									{!hasClearHerd && !isPerfectMatch && (
										<div className="bg-yellow-100 border-2 border-yellow-500 p-4 rounded-lg">
											<p className="text-sm text-yellow-800">
												{allUnique
													? 'All answers are unique - no points awarded this try.'
													: hasTie
														? 'Multiple answers tied for largest group - no herd exists, no points awarded.'
														: 'No clear herd - no points awarded this try.'
												}
											</p>
										</div>
									)}
									{Array.from(answerGroups.entries()).map(([answer, playerIds], index) => {
										// Winner only if clear herd exists and this is that group
										const isWinner = hasClearHerd && playerIds.length === maxGroupSize;
										const players = playerIds.map((pid) => room.players.find((p) => p.id === pid)).filter(Boolean);
										const colors = [
											'border-blue-400 bg-blue-50',
											'border-purple-400 bg-purple-50',
											'border-pink-400 bg-pink-50',
											'border-orange-400 bg-orange-50',
										];
										const colorClass = colors[index % colors.length];

										return (
											<div
												key={answer}
												className={`p-4 rounded-lg border-2 ${isWinner
													? 'bg-green-100 border-green-500'
													: colorClass
													}`}
											>
												<div className={`font-semibold mb-2 ${isWinner ? 'text-green-900' : 'text-gray-900'}`}>
													{answer} {isWinner && '✓ Winner!'}
												</div>
												<div className={`text-sm ${isWinner ? 'text-green-800' : 'text-gray-700'}`}>
													{players.map((p) => p?.name).join(', ')} ({playerIds.length})
												</div>
											</div>
										);
									})}
								</div>
							);
						})()}

						<div className="space-y-2">
							<h3 className="text-lg font-semibold text-black">Scores</h3>
							{room.players
								.sort((a, b) => b.score - a.score)
								.map((player, index) => {
									const colors = [
										'border-yellow-400 bg-yellow-50',
										'border-blue-400 bg-blue-50',
										'border-green-400 bg-green-50',
										'border-purple-400 bg-purple-50',
										'border-pink-400 bg-pink-50',
									];
									const colorClass = colors[index % colors.length];
									return (
										<div
											key={player.id}
											className={`flex items-center justify-between p-3 rounded-lg border-2 ${colorClass}`}
										>
											<span className="text-gray-900 font-medium">{player.name}</span>
											<span className="text-gray-700 font-semibold">{player.score} points</span>
										</div>
									);
								})}
						</div>

						{isHost && (
							<div className="space-y-2">
								{roundState.tryNumber && roundState.tryNumber < 3 ? (
									<button
										onClick={handleNextTry}
										className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg border-2 border-blue-600 hover:from-blue-600 hover:to-cyan-600 transition-all font-semibold shadow-lg"
									>
										Next Try ({roundState.tryNumber + 1} of 3)
									</button>
								) : (
									<button
										onClick={handleNextRound}
										className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg border-2 border-purple-600 hover:from-purple-600 hover:to-pink-600 transition-all font-semibold shadow-lg"
									>
										Next Question
									</button>
								)}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

