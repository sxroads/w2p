# Party Games - Room-Based Multiplayer Games

A monorepo for party games that can be played in rooms, starting with Herd Mentality.

## Structure

- `apps/web` - Next.js frontend
- `apps/server` - Node.js + Socket.IO backend
- `packages/shared` - Shared TypeScript types

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development servers:
```bash
npm run dev
```

This will start both the Next.js app (port 3000) and the Socket.IO server (port 3001).

## Environment Variables

Create a `.env.local` file in `apps/web`:
```
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

## How to Play

1. Open http://localhost:3000
2. Enter your name and either:
   - Click "Create Room" to create a new room
   - Enter a 6-character room code and click "Join Room"
3. Wait for players to join in the lobby
4. Host clicks "Start Game" to begin
5. Answer prompts and try to match with other players!

## Development

- Frontend: `apps/web` (Next.js)
- Backend: `apps/server` (Socket.IO on port 3001)
- Shared types: `packages/shared`
