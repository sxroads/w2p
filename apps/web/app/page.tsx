'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSocket } from '@/lib/socket';

type Mode = 'select' | 'join' | 'create';
type JoinStep = 'code' | 'name';

export default function Home() {
	const [mode, setMode] = useState<Mode>('select');
	const [name, setName] = useState('');
	const [roomCode, setRoomCode] = useState('');
	const [joinStep, setJoinStep] = useState<JoinStep>('code');
	const [isCreating, setIsCreating] = useState(false);
	const [isJoining, setIsJoining] = useState(false);
	const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('connecting');
	const router = useRouter();
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const socket = getSocket();

		const handleConnect = () => {
			console.log('Connection status: connected');
			setConnectionStatus('connected');
		};

		const handleDisconnect = () => {
			console.log('Connection status: disconnected');
			setConnectionStatus('disconnected');
		};

		const handleConnectError = (error: Error) => {
			console.error('Connection error:', error);
			setConnectionStatus('disconnected');
		};

		socket.on('connect', handleConnect);
		socket.on('disconnect', handleDisconnect);
		socket.on('connect_error', handleConnectError);

		// Force connection attempt if not connected
		if (!socket.connected && !socket.active) {
			console.log('Attempting to connect socket...');
			socket.connect();
		}

		return () => {
			socket.off('connect', handleConnect);
			socket.off('disconnect', handleDisconnect);
			socket.off('connect_error', handleConnectError);
		};
	}, []);

	const handleCreateRoom = () => {
		if (!name.trim()) {
			alert('Please enter your name');
			return;
		}

		setIsCreating(true);
		const socket = getSocket();

		// Cleanup function
		const cleanup = () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
			socket.off('join:success', handleJoinSuccess);
			socket.off('room:state', handleRoomState);
			socket.off('error', handleError);
			socket.off('connect', handleConnect);
			socket.off('connect_error', handleConnectError);
		};

		// Set up handlers first
		const handleJoinSuccess = (data: { playerId: string; token: string }) => {
			localStorage.setItem('playerId', data.playerId);
			localStorage.setItem('playerToken', data.token);
			localStorage.setItem('playerName', name);
		};

		const handleRoomState = (room: { code: string }) => {
			cleanup();
			setIsCreating(false);
			router.push(`/room/${room.code}`);
		};

		const handleError = (error: { message: string }) => {
			cleanup();
			alert(error.message);
			setIsCreating(false);
		};

		const handleConnect = () => {
			console.log('Socket connected, emitting create:room');
			socket.emit('create:room', { name: name.trim() });
		};

		const handleConnectError = (error: Error) => {
			cleanup();
			console.error('Connection error:', error);
			alert(`Failed to connect to server. Make sure the server is running on ${process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'}`);
			setIsCreating(false);
		};

		socket.on('join:success', handleJoinSuccess);
		socket.on('room:state', handleRoomState);
		socket.on('error', handleError);
		socket.on('connect_error', handleConnectError);

		// Wait for socket to be connected before emitting
		if (socket.connected) {
			console.log('Socket already connected, emitting create:room');
			socket.emit('create:room', { name: name.trim() });
		} else {
			console.log('Socket not connected, waiting for connect event');
			socket.on('connect', handleConnect);
			// Also try to connect if not already attempting
			if (!socket.active) {
				socket.connect();
			}
		}

		// Timeout fallback
		timeoutRef.current = setTimeout(() => {
			cleanup();
			setIsCreating(false);
			alert('Connection timeout. Please make sure the server is running on port 3001.');
		}, 10000);
	};

	const handleJoinRoom = () => {
		if (!name.trim()) {
			alert('Please enter your name');
			return;
		}
		if (!roomCode.trim() || roomCode.length !== 6) {
			alert('Please enter a valid 6-character room code');
			return;
		}

		setIsJoining(true);
		const playerId = localStorage.getItem('playerId');
		const token = localStorage.getItem('playerToken');
		const socket = getSocket();

		const cleanup = () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
			socket.off('join:success', handleJoinSuccess);
			socket.off('room:state', handleRoomState);
			socket.off('error', handleError);
			socket.off('connect', handleConnect);
			socket.off('connect_error', handleConnectError);
		};

		const handleJoinSuccess = (data: { playerId: string; token: string }) => {
			localStorage.setItem('playerId', data.playerId);
			localStorage.setItem('playerToken', data.token);
			localStorage.setItem('playerName', name);
		};

		const handleRoomState = () => {
			cleanup();
			setIsJoining(false);
			router.push(`/room/${roomCode.toUpperCase()}`);
		};

		const handleError = (error: { message: string }) => {
			cleanup();
			alert(error.message);
			setIsJoining(false);
		};

		const handleConnect = () => {
			socket.emit('join', {
				code: roomCode.toUpperCase(),
				playerId: playerId || undefined,
				token: token || undefined,
				name: name.trim(),
			});
		};

		const handleConnectError = (error: Error) => {
			cleanup();
			console.error('Connection error:', error);
			alert(`Failed to connect to server. Make sure the server is running on ${process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'}`);
			setIsJoining(false);
		};

		socket.on('join:success', handleJoinSuccess);
		socket.on('room:state', handleRoomState);
		socket.on('error', handleError);
		socket.on('connect_error', handleConnectError);

		// Wait for socket to be connected before emitting
		if (socket.connected) {
			socket.emit('join', {
				code: roomCode.toUpperCase(),
				playerId: playerId || undefined,
				token: token || undefined,
				name: name.trim(),
			});
		} else {
			socket.on('connect', handleConnect);
			if (!socket.active) {
				socket.connect();
			}
		}

		// Timeout fallback
		timeoutRef.current = setTimeout(() => {
			cleanup();
			setIsJoining(false);
			alert('Connection timeout. Please make sure the server is running on port 3001.');
		}, 10000);
	};

	return (
		<div className="flex min-h-screen items-center justify-center font-sans relative z-10">
			<main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-8 px-8 py-16 relative z-10 bg-white/60 backdrop-blur-sm rounded-lg shadow-lg">
				<div className="w-full text-center">
					<h1 className="text-4xl font-bold text-black mb-2">Party Games</h1>
					<div className="flex items-center justify-center gap-2 text-sm">
						<div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500' :
							connectionStatus === 'connecting' ? 'bg-yellow-500' :
								'bg-red-500'
							}`}></div>
						<span className="text-gray-600">
							{connectionStatus === 'connected' ? 'Connected' :
								connectionStatus === 'connecting' ? 'Connecting...' :
									'Disconnected'}
						</span>
					</div>
				</div>

				<div className="w-full max-w-md space-y-6">
					{mode === 'select' && (
						<>
							<div className="flex gap-4">
								<button
									onClick={() => setMode('join')}
									className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg border-2 border-blue-600 hover:bg-blue-600 transition-colors font-semibold shadow-md"
								>
									Join Room
								</button>
								<button
									onClick={() => setMode('create')}
									className="flex-1 px-6 py-3 bg-purple-500 text-white rounded-lg border-2 border-purple-600 hover:bg-purple-600 transition-colors font-semibold shadow-md"
								>
									Create Room
								</button>
							</div>
						</>
					)}

					{mode === 'join' && (
						<>
							{joinStep === 'code' && (
								<>
									<div>
										<label htmlFor="roomCode" className="block text-sm font-medium text-gray-700 mb-2">
											Room Code
										</label>
										<input
											id="roomCode"
											type="text"
											value={roomCode}
											onChange={(e) => setRoomCode(e.target.value.toUpperCase().slice(0, 6))}
											placeholder="Enter 6-character code"
											maxLength={6}
											className="w-full px-4 py-2 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white text-black"
											onKeyDown={(e) => {
												if (e.key === 'Enter' && roomCode.trim().length === 6) {
													setJoinStep('name');
												}
											}}
											autoFocus
										/>
									</div>
									<div className="flex gap-4">
										<button
											onClick={() => {
												setMode('select');
												setRoomCode('');
												setJoinStep('code');
											}}
											className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg border-2 border-gray-300 hover:bg-gray-300 transition-colors font-semibold"
										>
											Back
										</button>
										<button
											onClick={() => roomCode.trim().length === 6 && setJoinStep('name')}
											disabled={roomCode.trim().length !== 6}
											className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg border-2 border-blue-600 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold shadow-md"
										>
											Next
										</button>
									</div>
								</>
							)}

							{joinStep === 'name' && (
								<>
									<div>
										<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
											Your Name
										</label>
										<input
											id="name"
											type="text"
											value={name}
											onChange={(e) => setName(e.target.value)}
											placeholder="Enter your name"
											className="w-full px-4 py-2 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white text-black"
											onKeyDown={(e) => {
												if (e.key === 'Enter' && name.trim()) {
													handleJoinRoom();
												}
											}}
											autoFocus
										/>
									</div>
									<div className="flex gap-4">
										<button
											onClick={() => {
												setJoinStep('code');
												setName('');
											}}
											className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg border-2 border-gray-300 hover:bg-gray-300 transition-colors font-semibold"
										>
											Back
										</button>
										<button
											onClick={handleJoinRoom}
											disabled={isJoining || !name.trim()}
											className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg border-2 border-blue-600 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold shadow-md"
										>
											{isJoining ? 'Joining...' : 'Join Room'}
										</button>
									</div>
								</>
							)}
						</>
					)}

					{mode === 'create' && (
						<>
							<div>
								<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
									Your Name
								</label>
								<input
									id="name"
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="Enter your name"
									className="w-full px-4 py-2 border-2 border-purple-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-600 bg-white text-black"
									onKeyDown={(e) => {
										if (e.key === 'Enter' && name.trim()) {
											handleCreateRoom();
										}
									}}
									autoFocus
								/>
							</div>
							<div className="flex gap-4">
								<button
									onClick={() => {
										setMode('select');
										setName('');
									}}
									className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg border-2 border-gray-300 hover:bg-gray-300 transition-colors font-semibold"
								>
									Back
								</button>
								<button
									onClick={handleCreateRoom}
									disabled={isCreating || !name.trim()}
									className="flex-1 px-6 py-3 bg-purple-500 text-white rounded-lg border-2 border-purple-600 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold shadow-md"
								>
									{isCreating ? 'Creating...' : 'Create Room'}
								</button>
							</div>
						</>
					)}
				</div>
			</main>
		</div>
	);
}
