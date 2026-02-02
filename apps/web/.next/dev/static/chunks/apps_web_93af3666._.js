(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/web/lib/socket.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SOCKET_URL",
    ()=>SOCKET_URL,
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
function getSocketUrl() {
    // Use env var if explicitly set
    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SOCKET_URL) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SOCKET_URL;
    }
    // In browser, auto-detect from current location
    if ("TURBOPACK compile-time truthy", 1) {
        const protocol = window.location.protocol === 'https:' ? 'https' : 'http';
        const hostname = window.location.hostname;
        // Use same hostname, port 3001
        // In production (no port in URL), assume socket server is on same domain or use port 3001
        const port = window.location.port ? ':3001' : ':3001';
        return `${protocol}://${hostname}${port}`;
    }
    //TURBOPACK unreachable
    ;
}
const SOCKET_URL = getSocketUrl();
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
"[project]/apps/web/app/room/[code]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RoomPage
]);
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
function RoomPage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const code = params.code;
    const [room, setRoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [answer, setAnswer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoomPage.useEffect": ()=>{
            const playerId = localStorage.getItem('playerId');
            const token = localStorage.getItem('playerToken');
            const playerName = localStorage.getItem('playerName') || 'Player';
            if (!playerId || !token) {
                router.push('/');
                return;
            }
            const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSocket"])();
            const unsubscribeState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onRoomState"])({
                "RoomPage.useEffect.unsubscribeState": (state)=>{
                    setRoom(state);
                    // Check if player has submitted answer
                    if (state.phase === 'IN_ROUND' && state.roundState) {
                        const roundState = state.roundState;
                        if (roundState.answers && roundState.answers[playerId]) {
                            setSubmitted(true);
                        } else {
                            setSubmitted(false);
                        }
                    } else {
                        setSubmitted(false);
                    }
                }
            }["RoomPage.useEffect.unsubscribeState"]);
            const unsubscribeError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onError"])({
                "RoomPage.useEffect.unsubscribeError": (err)=>{
                    setError(err.message);
                }
            }["RoomPage.useEffect.unsubscribeError"]);
            socket.emit('join', {
                code: code.toUpperCase(),
                playerId,
                token,
                name: playerName
            });
            return ({
                "RoomPage.useEffect": ()=>{
                    unsubscribeState();
                    unsubscribeError();
                }
            })["RoomPage.useEffect"];
        }
    }["RoomPage.useEffect"], [
        code,
        router
    ]);
    const handleStartGame = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["emitAction"])({
            type: 'START_GAME',
            payload: {
                gameId: 'HERD_MENTALITY'
            }
        });
    };
    const handleSubmitAnswer = ()=>{
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["emitAction"])({
            type: 'SUBMIT_ANSWER',
            payload: {
                answer: answer.trim()
            }
        });
        setSubmitted(true);
        setError(null);
    };
    const handleReveal = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["emitAction"])({
            type: 'REVEAL',
            payload: {}
        });
    };
    const handleNextTry = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["emitAction"])({
            type: 'NEXT_TRY',
            payload: {}
        });
        setAnswer('');
        setSubmitted(false);
    };
    const handleNextRound = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$lib$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["emitAction"])({
            type: 'NEXT_ROUND',
            payload: {}
        });
        setAnswer('');
        setSubmitted(false);
    };
    if (!room) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex min-h-screen items-center justify-center relative z-10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center relative z-10 bg-white/80 backdrop-blur-sm rounded-lg px-8 py-4 shadow-lg",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600",
                    children: "Loading room..."
                }, void 0, false, {
                    fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                    lineNumber: 119,
                    columnNumber: 6
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                lineNumber: 118,
                columnNumber: 5
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/app/room/[code]/page.tsx",
            lineNumber: 117,
            columnNumber: 4
        }, this);
    }
    const playerId = localStorage.getItem('playerId') || '';
    const isHost = room.hostId === playerId;
    const roundState = room.roundState;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen flex-col relative z-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b-4 border-purple-500 px-6 py-4 bg-gradient-to-r from-purple-50/90 to-pink-50/90 backdrop-blur-sm relative z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-2xl font-bold text-black",
                                    children: [
                                        "Room: ",
                                        room.code
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                    lineNumber: 142,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600",
                                    children: [
                                        room.players.length,
                                        " player",
                                        room.players.length !== 1 ? 's' : ''
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                    lineNumber: 143,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                            lineNumber: 141,
                            columnNumber: 6
                        }, this),
                        isHost && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm text-purple-600 font-semibold bg-purple-100 px-3 py-1 rounded-full border-2 border-purple-400",
                            children: "Host"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                            lineNumber: 147,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                    lineNumber: 140,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                lineNumber: 139,
                columnNumber: 4
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-100 border-2 border-red-500 text-red-700 px-4 py-3 mx-6 mt-4 rounded-lg",
                children: error
            }, void 0, false, {
                fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                lineNumber: 152,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 max-w-4xl mx-auto w-full px-6 py-8 bg-white/60 backdrop-blur-sm rounded-lg shadow-lg my-4",
                children: [
                    room.phase === 'LOBBY' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold text-black",
                                children: "Players"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                lineNumber: 160,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: room.players.map((player, index)=>{
                                    const colors = [
                                        'border-blue-400 bg-blue-50',
                                        'border-green-400 bg-green-50',
                                        'border-yellow-400 bg-yellow-50',
                                        'border-pink-400 bg-pink-50',
                                        'border-purple-400 bg-purple-50',
                                        'border-orange-400 bg-orange-50'
                                    ];
                                    const colorClass = colors[index % colors.length];
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `flex items-center justify-between p-4 rounded-lg border-2 ${colorClass}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-900 font-medium",
                                                children: [
                                                    player.name,
                                                    " ",
                                                    player.id === room.hostId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-purple-600",
                                                        children: "(Host)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                                        lineNumber: 178,
                                                        columnNumber: 56
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                                lineNumber: 177,
                                                columnNumber: 11
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-700 font-semibold",
                                                children: [
                                                    "Score: ",
                                                    player.score
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                                lineNumber: 180,
                                                columnNumber: 11
                                            }, this)
                                        ]
                                    }, player.id, true, {
                                        fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                        lineNumber: 173,
                                        columnNumber: 10
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                lineNumber: 161,
                                columnNumber: 7
                            }, this),
                            isHost && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleStartGame,
                                className: "w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg border-2 border-purple-600 hover:from-purple-600 hover:to-pink-600 transition-all font-semibold shadow-lg",
                                children: "Start Game (Herd Mentality)"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                lineNumber: 186,
                                columnNumber: 8
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                        lineNumber: 159,
                        columnNumber: 6
                    }, this),
                    room.phase === 'IN_ROUND' && roundState && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold text-black mb-2",
                                        children: roundState.prompt
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                        lineNumber: 199,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-600 mb-4 font-semibold",
                                        children: [
                                            "Try ",
                                            roundState.tryNumber || 1,
                                            " of 3"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                        lineNumber: 202,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                lineNumber: 198,
                                columnNumber: 7
                            }, this),
                            roundState.previousAnswers && roundState.previousAnswers[playerId] && roundState.previousAnswers[playerId].length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-yellow-50 border-2 border-yellow-400 p-4 rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold text-yellow-900 mb-2",
                                        children: "Your previous answers (can't reuse):"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                        lineNumber: 209,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-yellow-800",
                                        children: roundState.previousAnswers[playerId].join(', ')
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                        lineNumber: 212,
                                        columnNumber: 9
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                lineNumber: 208,
                                columnNumber: 8
                            }, this),
                            !submitted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: answer,
                                        onChange: (e)=>setAnswer(e.target.value),
                                        placeholder: "Your answer...",
                                        className: "w-full px-4 py-3 border-2 border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-600 bg-white text-black",
                                        onKeyDown: (e)=>{
                                            if (e.key === 'Enter' && answer.trim()) {
                                                handleSubmitAnswer();
                                            }
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                        lineNumber: 220,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSubmitAnswer,
                                        disabled: !answer.trim(),
                                        className: "w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg border-2 border-green-600 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg",
                                        children: "Submit Answer"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                        lineNumber: 232,
                                        columnNumber: 9
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                lineNumber: 219,
                                columnNumber: 8
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-8 bg-blue-50 border-2 border-blue-400 rounded-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg text-blue-800 font-semibold",
                                    children: "Waiting for other players..."
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                    lineNumber: 242,
                                    columnNumber: 9
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                lineNumber: 241,
                                columnNumber: 8
                            }, this),
                            isHost && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-600 mb-2 font-semibold",
                                        children: [
                                            Object.keys(roundState.answers || {}).length,
                                            " / ",
                                            room.players.length,
                                            " answers submitted"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                        lineNumber: 250,
                                        columnNumber: 9
                                    }, this),
                                    Object.keys(roundState.answers || {}).length === room.players.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleReveal,
                                        className: "w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg border-2 border-orange-600 hover:from-orange-600 hover:to-red-600 transition-all font-semibold shadow-lg",
                                        children: "Reveal Answers"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                        lineNumber: 255,
                                        columnNumber: 10
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                lineNumber: 249,
                                columnNumber: 8
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                        lineNumber: 197,
                        columnNumber: 6
                    }, this),
                    room.phase === 'REVEAL' && roundState && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold text-black",
                                children: "Answers"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                lineNumber: 269,
                                columnNumber: 7
                            }, this),
                            (()=>{
                                const answers = roundState.answers || {};
                                const answerGroups = new Map();
                                for (const [playerId, answer] of Object.entries(answers)){
                                    const normalized = answer.toLowerCase().trim();
                                    if (!answerGroups.has(normalized)) {
                                        answerGroups.set(normalized, []);
                                    }
                                    answerGroups.get(normalized).push(playerId);
                                }
                                const maxGroupSize = Math.max(...Array.from(answerGroups.values()).map((g)=>g.length), 0);
                                // Count how many groups have the max size
                                const groupsWithMaxSize = Array.from(answerGroups.values()).filter((g)=>g.length === maxGroupSize).length;
                                // Winner only if there's exactly one group with max size AND max size > 1 (clear herd, not all unique)
                                const hasClearHerd = groupsWithMaxSize === 1 && maxGroupSize > 1;
                                const allUnique = maxGroupSize === 1;
                                const hasTie = groupsWithMaxSize > 1 && maxGroupSize > 1;
                                // Check for 100% match (all players gave the same answer)
                                const isPerfectMatch = answerGroups.size === 1 && maxGroupSize === room.players.length;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        isPerfectMatch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-green-100 border-2 border-green-500 p-4 rounded-lg",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-semibold text-green-800",
                                                children: "🎉 Perfect Match! All players gave the same answer. Round complete!"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                                lineNumber: 297,
                                                columnNumber: 12
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                            lineNumber: 296,
                                            columnNumber: 11
                                        }, this),
                                        !hasClearHerd && !isPerfectMatch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-yellow-100 border-2 border-yellow-500 p-4 rounded-lg",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-yellow-800",
                                                children: allUnique ? 'All answers are unique - no points awarded this try.' : hasTie ? 'Multiple answers tied for largest group - no herd exists, no points awarded.' : 'No clear herd - no points awarded this try.'
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                                lineNumber: 304,
                                                columnNumber: 12
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                            lineNumber: 303,
                                            columnNumber: 11
                                        }, this),
                                        Array.from(answerGroups.entries()).map(([answer, playerIds], index)=>{
                                            // Winner only if clear herd exists and this is that group
                                            const isWinner = hasClearHerd && playerIds.length === maxGroupSize;
                                            const players = playerIds.map((pid)=>room.players.find((p)=>p.id === pid)).filter(Boolean);
                                            const colors = [
                                                'border-blue-400 bg-blue-50',
                                                'border-purple-400 bg-purple-50',
                                                'border-pink-400 bg-pink-50',
                                                'border-orange-400 bg-orange-50'
                                            ];
                                            const colorClass = colors[index % colors.length];
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `p-4 rounded-lg border-2 ${isWinner ? 'bg-green-100 border-green-500' : colorClass}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `font-semibold mb-2 ${isWinner ? 'text-green-900' : 'text-gray-900'}`,
                                                        children: [
                                                            answer,
                                                            " ",
                                                            isWinner && '✓ Winner!'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                                        lineNumber: 334,
                                                        columnNumber: 13
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `text-sm ${isWinner ? 'text-green-800' : 'text-gray-700'}`,
                                                        children: [
                                                            players.map((p)=>p?.name).join(', '),
                                                            " (",
                                                            playerIds.length,
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                                        lineNumber: 337,
                                                        columnNumber: 13
                                                    }, this)
                                                ]
                                            }, answer, true, {
                                                fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                                lineNumber: 327,
                                                columnNumber: 12
                                            }, this);
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                    lineNumber: 294,
                                    columnNumber: 9
                                }, this);
                            })(),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-black",
                                        children: "Scores"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                        lineNumber: 348,
                                        columnNumber: 8
                                    }, this),
                                    room.players.sort((a, b)=>b.score - a.score).map((player, index)=>{
                                        const colors = [
                                            'border-yellow-400 bg-yellow-50',
                                            'border-blue-400 bg-blue-50',
                                            'border-green-400 bg-green-50',
                                            'border-purple-400 bg-purple-50',
                                            'border-pink-400 bg-pink-50'
                                        ];
                                        const colorClass = colors[index % colors.length];
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `flex items-center justify-between p-3 rounded-lg border-2 ${colorClass}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-900 font-medium",
                                                    children: player.name
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                                    lineNumber: 365,
                                                    columnNumber: 12
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-700 font-semibold",
                                                    children: [
                                                        player.score,
                                                        " points"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                                    lineNumber: 366,
                                                    columnNumber: 12
                                                }, this)
                                            ]
                                        }, player.id, true, {
                                            fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                            lineNumber: 361,
                                            columnNumber: 11
                                        }, this);
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                lineNumber: 347,
                                columnNumber: 7
                            }, this),
                            isHost && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: roundState.tryNumber && roundState.tryNumber < 3 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleNextTry,
                                    className: "w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg border-2 border-blue-600 hover:from-blue-600 hover:to-cyan-600 transition-all font-semibold shadow-lg",
                                    children: [
                                        "Next Try (",
                                        roundState.tryNumber + 1,
                                        " of 3)"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                    lineNumber: 375,
                                    columnNumber: 10
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleNextRound,
                                    className: "w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg border-2 border-purple-600 hover:from-purple-600 hover:to-pink-600 transition-all font-semibold shadow-lg",
                                    children: "Next Question"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                    lineNumber: 382,
                                    columnNumber: 10
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                                lineNumber: 373,
                                columnNumber: 8
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                        lineNumber: 268,
                        columnNumber: 6
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/app/room/[code]/page.tsx",
                lineNumber: 157,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/app/room/[code]/page.tsx",
        lineNumber: 138,
        columnNumber: 3
    }, this);
}
_s(RoomPage, "sxbKPiIKOcpgfIrR2QxW/0xtNwc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = RoomPage;
var _c;
__turbopack_context__.k.register(_c, "RoomPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_web_93af3666._.js.map