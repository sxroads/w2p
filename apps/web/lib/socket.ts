import { io, Socket } from 'socket.io-client';
import type { RoomState, Action } from '@w2p/shared';

function getSocketUrl(): string {
	// Use env var if explicitly set
	if (process.env.NEXT_PUBLIC_SOCKET_URL) {
		return process.env.NEXT_PUBLIC_SOCKET_URL;
	}

	// In browser, auto-detect from current location
	if (typeof window !== 'undefined') {
		const protocol = window.location.protocol === 'https:' ? 'https' : 'http';
		const hostname = window.location.hostname;
		// Use same hostname, port 3001
		// In production (no port in URL), assume socket server is on same domain or use port 3001
		const port = window.location.port ? ':3001' : ':3001';
		return `${protocol}://${hostname}${port}`;
	}

	// Server-side fallback (development only)
	return 'http://localhost:3001';
}

export const SOCKET_URL = getSocketUrl();

let socket: Socket | null = null;

export function getSocket(): Socket {
	if (!socket) {
		console.log('Creating new socket connection to:', SOCKET_URL);
		socket = io(SOCKET_URL, {
			transports: ['websocket', 'polling'],
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionAttempts: 5,
			autoConnect: true,
		});

		socket.on('connect', () => {
			console.log('Socket connected:', socket?.id);
		});

		socket.on('disconnect', (reason) => {
			console.log('Socket disconnected:', reason);
		});

		socket.on('connect_error', (error) => {
			console.error('Socket connection error:', error.message, error);
		});

		socket.on('reconnect', (attemptNumber) => {
			console.log('Socket reconnected after', attemptNumber, 'attempts');
		});

		socket.on('reconnect_error', (error) => {
			console.error('Socket reconnection error:', error);
		});

		socket.on('reconnect_failed', () => {
			console.error('Socket reconnection failed');
		});
	}
	return socket;
}

export function disconnectSocket(): void {
	if (socket) {
		socket.disconnect();
		socket = null;
	}
}

export function emitAction(action: Action): void {
	const s = getSocket();
	s.emit('game:action', action);
}

export function onRoomState(callback: (state: RoomState) => void): () => void {
	const s = getSocket();
	s.on('room:state', callback);
	return () => s.off('room:state', callback);
}

export function onError(callback: (error: { message: string }) => void): () => void {
	const s = getSocket();
	s.on('error', callback);
	return () => s.off('error', callback);
}

export function onJoinSuccess(callback: (data: { playerId: string; token: string }) => void): () => void {
	const s = getSocket();
	s.on('join:success', callback);
	return () => s.off('join:success', callback);
}

