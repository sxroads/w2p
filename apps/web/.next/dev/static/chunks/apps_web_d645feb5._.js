(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/web/lib/socket.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "disconnectSocket",
    ()=>disconnectSocket,
    "emitAction",
    ()=>emitAction,
    "getSocket",
    ()=>getSocket,
    "onError",
    ()=>onError,
    "onJoinSuccess",
    ()=>onJoinSuccess,
    "onRoomState",
    ()=>onRoomState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
;
const SOCKET_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';
let socket = null;
function getSocket() {
    if (!socket) {
        console.log('Creating new socket connection to:', SOCKET_URL);
        socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])(SOCKET_URL, {
            transports: [
                'websocket',
                'polling'
            ],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5,
            autoConnect: true
        });
        socket.on('connect', ()=>{
            console.log('Socket connected:', socket?.id);
        });
        socket.on('disconnect', (reason)=>{
            console.log('Socket disconnected:', reason);
        });
        socket.on('connect_error', (error)=>{
            console.error('Socket connection error:', error.message, error);
        });
        socket.on('reconnect', (attemptNumber)=>{
            console.log('Socket reconnected after', attemptNumber, 'attempts');
        });
        socket.on('reconnect_error', (error)=>{
            console.error('Socket reconnection error:', error);
        });
        socket.on('reconnect_failed', ()=>{
            console.error('Socket reconnection failed');
        });
    }
    return socket;
}
function disconnectSocket() {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
}
function emitAction(action) {
    const s = getSocket();
    s.emit('game:action', action);
}
function onRoomState(callback) {
    const s = getSocket();
    s.on('room:state', callback);
    return ()=>s.off('room:state', callback);
}
function onError(callback) {
    const s = getSocket();
    s.on('error', callback);
    return ()=>s.off('error', callback);
}
function onJoinSuccess(callback) {
    const s = getSocket();
    s.on('join:success', callback);
    return ()=>s.off('join:success', callback);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/lib/socket.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function Home() {
    _s();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('select');
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [roomCode, setRoomCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [joinStep, setJoinStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('code');
    const [isCreating, setIsCreating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isJoining, setIsJoining] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [connectionStatus, setConnectionStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('connecting');
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const timeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSocket"])();
            const handleConnect = {
                "Home.useEffect.handleConnect": ()=>{
                    console.log('Connection status: connected');
                    setConnectionStatus('connected');
                }
            }["Home.useEffect.handleConnect"];
            const handleDisconnect = {
                "Home.useEffect.handleDisconnect": ()=>{
                    console.log('Connection status: disconnected');
                    setConnectionStatus('disconnected');
                }
            }["Home.useEffect.handleDisconnect"];
            const handleConnectError = {
                "Home.useEffect.handleConnectError": (error)=>{
                    console.error('Connection error:', error);
                    setConnectionStatus('disconnected');
                }
            }["Home.useEffect.handleConnectError"];
            socket.on('connect', handleConnect);
            socket.on('disconnect', handleDisconnect);
            socket.on('connect_error', handleConnectError);
            // Force connection attempt if not connected
            if (!socket.connected && !socket.active) {
                console.log('Attempting to connect socket...');
                socket.connect();
            }
            return ({
                "Home.useEffect": ()=>{
                    socket.off('connect', handleConnect);
                    socket.off('disconnect', handleDisconnect);
                    socket.off('connect_error', handleConnectError);
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], []);
    const handleCreateRoom = ()=>{
        if (!name.trim()) {
            alert('Please enter your name');
            return;
        }
        setIsCreating(true);
        const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSocket"])();
        // Cleanup function
        const cleanup = ()=>{
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
        const handleJoinSuccess = (data)=>{
            localStorage.setItem('playerId', data.playerId);
            localStorage.setItem('playerToken', data.token);
            localStorage.setItem('playerName', name);
        };
        const handleRoomState = (room)=>{
            cleanup();
            setIsCreating(false);
            router.push(`/room/${room.code}`);
        };
        const handleError = (error)=>{
            cleanup();
            alert(error.message);
            setIsCreating(false);
        };
        const handleConnect = ()=>{
            console.log('Socket connected, emitting create:room');
            socket.emit('create:room', {
                name: name.trim()
            });
        };
        const handleConnectError = (error)=>{
            cleanup();
            console.error('Connection error:', error);
            alert(`Failed to connect to server. Make sure the server is running on ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'}`);
            setIsCreating(false);
        };
        socket.on('join:success', handleJoinSuccess);
        socket.on('room:state', handleRoomState);
        socket.on('error', handleError);
        socket.on('connect_error', handleConnectError);
        // Wait for socket to be connected before emitting
        if (socket.connected) {
            console.log('Socket already connected, emitting create:room');
            socket.emit('create:room', {
                name: name.trim()
            });
        } else {
            console.log('Socket not connected, waiting for connect event');
            socket.on('connect', handleConnect);
            // Also try to connect if not already attempting
            if (!socket.active) {
                socket.connect();
            }
        }
        // Timeout fallback
        timeoutRef.current = setTimeout(()=>{
            cleanup();
            setIsCreating(false);
            alert('Connection timeout. Please make sure the server is running on port 3001.');
        }, 10000);
    };
    const handleJoinRoom = ()=>{
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
        const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSocket"])();
        const cleanup = ()=>{
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
        const handleJoinSuccess = (data)=>{
            localStorage.setItem('playerId', data.playerId);
            localStorage.setItem('playerToken', data.token);
            localStorage.setItem('playerName', name);
        };
        const handleRoomState = ()=>{
            cleanup();
            setIsJoining(false);
            router.push(`/room/${roomCode.toUpperCase()}`);
        };
        const handleError = (error)=>{
            cleanup();
            alert(error.message);
            setIsJoining(false);
        };
        const handleConnect = ()=>{
            socket.emit('join', {
                code: roomCode.toUpperCase(),
                playerId: playerId || undefined,
                token: token || undefined,
                name: name.trim()
            });
        };
        const handleConnectError = (error)=>{
            cleanup();
            console.error('Connection error:', error);
            alert(`Failed to connect to server. Make sure the server is running on ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'}`);
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
                name: name.trim()
            });
        } else {
            socket.on('connect', handleConnect);
            if (!socket.active) {
                socket.connect();
            }
        }
        // Timeout fallback
        timeoutRef.current = setTimeout(()=>{
            cleanup();
            setIsJoining(false);
            alert('Connection timeout. Please make sure the server is running on port 3001.');
        }, 10000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen items-center justify-center font-sans relative z-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-8 px-8 py-16 relative z-10 bg-white/60 backdrop-blur-sm rounded-lg shadow-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-4xl font-bold text-black mb-2",
                            children: "Party Games"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/app/page.tsx",
                            lineNumber: 228,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center gap-2 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500' : connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'}`
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/app/page.tsx",
                                    lineNumber: 230,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-600",
                                    children: connectionStatus === 'connected' ? 'Connected' : connectionStatus === 'connecting' ? 'Connecting...' : 'Disconnected'
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/app/page.tsx",
                                    lineNumber: 234,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/app/page.tsx",
                            lineNumber: 229,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/app/page.tsx",
                    lineNumber: 227,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-md space-y-6",
                    children: [
                        mode === 'select' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setMode('join'),
                                        className: "flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg border-2 border-blue-600 hover:bg-blue-600 transition-colors font-semibold shadow-md",
                                        children: "Join Room"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 246,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setMode('create'),
                                        className: "flex-1 px-6 py-3 bg-purple-500 text-white rounded-lg border-2 border-purple-600 hover:bg-purple-600 transition-colors font-semibold shadow-md",
                                        children: "Create Room"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/page.tsx",
                                        lineNumber: 252,
                                        columnNumber: 9
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/page.tsx",
                                lineNumber: 245,
                                columnNumber: 8
                            }, this)
                        }, void 0, false),
                        mode === 'join' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                joinStep === 'code' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "roomCode",
                                                    className: "block text-sm font-medium text-gray-700 mb-2",
                                                    children: "Room Code"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/app/page.tsx",
                                                    lineNumber: 267,
                                                    columnNumber: 11
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "roomCode",
                                                    type: "text",
                                                    value: roomCode,
                                                    onChange: (e)=>setRoomCode(e.target.value.toUpperCase().slice(0, 6)),
                                                    placeholder: "Enter 6-character code",
                                                    maxLength: 6,
                                                    className: "w-full px-4 py-2 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white text-black",
                                                    onKeyDown: (e)=>{
                                                        if (e.key === 'Enter' && roomCode.trim().length === 6) {
                                                            setJoinStep('name');
                                                        }
                                                    },
                                                    autoFocus: true
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/app/page.tsx",
                                                    lineNumber: 270,
                                                    columnNumber: 11
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/app/page.tsx",
                                            lineNumber: 266,
                                            columnNumber: 10
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setMode('select');
                                                        setRoomCode('');
                                                        setJoinStep('code');
                                                    },
                                                    className: "px-6 py-3 bg-gray-200 text-gray-800 rounded-lg border-2 border-gray-300 hover:bg-gray-300 transition-colors font-semibold",
                                                    children: "Back"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/app/page.tsx",
                                                    lineNumber: 287,
                                                    columnNumber: 11
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>roomCode.trim().length === 6 && setJoinStep('name'),
                                                    disabled: roomCode.trim().length !== 6,
                                                    className: "flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg border-2 border-blue-600 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold shadow-md",
                                                    children: "Next"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/app/page.tsx",
                                                    lineNumber: 297,
                                                    columnNumber: 11
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/app/page.tsx",
                                            lineNumber: 286,
                                            columnNumber: 10
                                        }, this)
                                    ]
                                }, void 0, true),
                                joinStep === 'name' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "name",
                                                    className: "block text-sm font-medium text-gray-700 mb-2",
                                                    children: "Your Name"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/app/page.tsx",
                                                    lineNumber: 311,
                                                    columnNumber: 11
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "name",
                                                    type: "text",
                                                    value: name,
                                                    onChange: (e)=>setName(e.target.value),
                                                    placeholder: "Enter your name",
                                                    className: "w-full px-4 py-2 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white text-black",
                                                    onKeyDown: (e)=>{
                                                        if (e.key === 'Enter' && name.trim()) {
                                                            handleJoinRoom();
                                                        }
                                                    },
                                                    autoFocus: true
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/app/page.tsx",
                                                    lineNumber: 314,
                                                    columnNumber: 11
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/app/page.tsx",
                                            lineNumber: 310,
                                            columnNumber: 10
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setJoinStep('code');
                                                        setName('');
                                                    },
                                                    className: "px-6 py-3 bg-gray-200 text-gray-800 rounded-lg border-2 border-gray-300 hover:bg-gray-300 transition-colors font-semibold",
                                                    children: "Back"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/app/page.tsx",
                                                    lineNumber: 330,
                                                    columnNumber: 11
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleJoinRoom,
                                                    disabled: isJoining || !name.trim(),
                                                    className: "flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg border-2 border-blue-600 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold shadow-md",
                                                    children: isJoining ? 'Joining...' : 'Join Room'
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/app/page.tsx",
                                                    lineNumber: 339,
                                                    columnNumber: 11
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/app/page.tsx",
                                            lineNumber: 329,
                                            columnNumber: 10
                                        }, this)
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true),
                        mode === 'create' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "name",
                                            className: "block text-sm font-medium text-gray-700 mb-2",
                                            children: "Your Name"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/page.tsx",
                                            lineNumber: 355,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "name",
                                            type: "text",
                                            value: name,
                                            onChange: (e)=>setName(e.target.value),
                                            placeholder: "Enter your name",
                                            className: "w-full px-4 py-2 border-2 border-purple-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-600 bg-white text-black",
                                            onKeyDown: (e)=>{
                                                if (e.key === 'Enter' && name.trim()) {
                                                    handleCreateRoom();
                                                }
                                            },
                                            autoFocus: true
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/page.tsx",
                                            lineNumber: 358,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/app/page.tsx",
                                    lineNumber: 354,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setMode('select');
                                                setName('');
                                            },
                                            className: "px-6 py-3 bg-gray-200 text-gray-800 rounded-lg border-2 border-gray-300 hover:bg-gray-300 transition-colors font-semibold",
                                            children: "Back"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/page.tsx",
                                            lineNumber: 374,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleCreateRoom,
                                            disabled: isCreating || !name.trim(),
                                            className: "flex-1 px-6 py-3 bg-purple-500 text-white rounded-lg border-2 border-purple-600 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold shadow-md",
                                            children: isCreating ? 'Creating...' : 'Create Room'
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/page.tsx",
                                            lineNumber: 383,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/app/page.tsx",
                                    lineNumber: 373,
                                    columnNumber: 8
                                }, this)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/app/page.tsx",
                    lineNumber: 242,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/app/page.tsx",
            lineNumber: 226,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/app/page.tsx",
        lineNumber: 225,
        columnNumber: 3
    }, this);
}
_s(Home, "X0yjGIkzAqSvmYoxcinjjCqBI8I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_web_d645feb5._.js.map