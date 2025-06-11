import { useState, useEffect } from "react";
import { DifficultyLevel, TrainingModeState, TrainingStats, PlayerSymbol } from "../utils/types";
import { Buffer } from "buffer";
window.Buffer = Buffer;

const INITIAL_STATS: TrainingStats = {
    gamesPlayed: 0,
    gamesWon: 0,
    gamesLost: 0,
    currentStreak: 0,
    bestStreak: 0,
    lastGameResult: null,
};

const STORAGE_KEY = "trainingModeStats";

export const useTrainingMode = (initialDifficulty: DifficultyLevel = DifficultyLevel.EASY) => {
    const [state, setState] = useState<TrainingModeState>({
        difficulty: initialDifficulty,
        stats: INITIAL_STATS,
        isPlayerTurn: true,
        board: Array(9).fill(null),
        winner: null,
        playerSymbol: "X",
        gameHistory: [],
    });

    useEffect(() => {
        const savedStats = localStorage.getItem(STORAGE_KEY);
        if (savedStats) {
            try {
                const parsedStats = JSON.parse(savedStats);
                setState((prev) => ({
                    ...prev,
                    stats: parsedStats,
                }));
            } catch (error) {
                console.error("Error loading stats:", error);
            }
        }
    }, []);

    const saveStats = (newStats: TrainingStats) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newStats));
    };

    const updateStats = (result: "win" | "lose") => {
        setState((prev) => {
            const newStats: TrainingStats = {
                ...prev.stats,
                gamesPlayed: prev.stats.gamesPlayed + 1,
                gamesWon: result === "win" ? prev.stats.gamesWon + 1 : prev.stats.gamesWon,
                gamesLost: result === "lose" ? prev.stats.gamesLost + 1 : prev.stats.gamesLost,
                currentStreak: result === "win" ? prev.stats.currentStreak + 1 : 0,
                bestStreak:
                    result === "win"
                        ? Math.max(prev.stats.currentStreak + 1, prev.stats.bestStreak)
                        : prev.stats.bestStreak,
                lastGameResult: result,
            };
            saveStats(newStats);
            return {
                ...prev,
                stats: newStats,
                gameHistory: [
                    ...prev.gameHistory,
                    {
                        difficulty: prev.difficulty,
                        result,
                        date: new Date(),
                        playerSymbol: prev.playerSymbol,
                    },
                ],
            };
        });
    };

    const checkWinner = (squares: (string | null)[]): string | null => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (const line of lines) {
            const [a, b, c] = line;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const getAIMove = (board: (string | null)[], difficulty: DifficultyLevel): number => {
        const emptySquares = board
            .map((square, index) => (square === null ? index : null))
            .filter((square): square is number => square !== null);
        if (emptySquares.length === 0) return -1;
        const aiSymbol = state.playerSymbol === "X" ? "O" : "X";
        const playerSymbol = state.playerSymbol;

        if (difficulty === DifficultyLevel.EASY) {
            // Losowy ruch
            return emptySquares[Math.floor(Math.random() * emptySquares.length)];
        }
        if (difficulty === DifficultyLevel.MEDIUM) {
            // 1. Jeśli AI może wygrać, wygraj
            for (const idx of emptySquares) {
                const testBoard = [...board];
                testBoard[idx] = aiSymbol;
                if (checkWinner(testBoard) === aiSymbol) return idx;
            }
            // 2. Jeśli gracz może wygrać, zablokuj
            for (const idx of emptySquares) {
                const testBoard = [...board];
                testBoard[idx] = playerSymbol;
                if (checkWinner(testBoard) === playerSymbol) return idx;
            }
            // 3. W innym wypadku losowo
            return emptySquares[Math.floor(Math.random() * emptySquares.length)];
        }
        // HARD: minimax
        let bestScore = -Infinity;
        let bestMove = -1;
        for (const idx of emptySquares) {
            const testBoard = [...board];
            testBoard[idx] = aiSymbol;
            const score = minimax(testBoard, false, aiSymbol, playerSymbol);
            if (score > bestScore) {
                bestScore = score;
                bestMove = idx;
            }
        }
        return bestMove;
    };

    function minimax(
        board: (string | null)[],
        isMaximizing: boolean,
        aiSymbol: string,
        playerSymbol: string
    ): number {
        const winner = checkWinner(board);
        if (winner === aiSymbol) return 1;
        if (winner === playerSymbol) return -1;
        if (!board.includes(null)) return 0;
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === null) {
                    board[i] = aiSymbol;
                    const score = minimax(board, false, aiSymbol, playerSymbol);
                    board[i] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === null) {
                    board[i] = playerSymbol;
                    const score = minimax(board, true, aiSymbol, playerSymbol);
                    board[i] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    const handlePlayerMove = (index: number) => {
        if (state.board[index] || state.winner || !state.isPlayerTurn) return;
        const newBoard = [...state.board];
        newBoard[index] = state.playerSymbol;
        const winner = checkWinner(newBoard);
        if (winner) {
            setState((prev) => ({
                ...prev,
                board: newBoard,
                winner: winner as PlayerSymbol | null,
                isPlayerTurn: false,
            }));
            updateStats(winner === state.playerSymbol ? "win" : "lose");
            return;
        }
        setState((prev) => ({
            ...prev,
            board: newBoard,
            isPlayerTurn: false,
        }));
        setTimeout(() => {
            const aiMove = getAIMove(newBoard, state.difficulty);
            if (aiMove !== -1) {
                const aiSymbol = state.playerSymbol === "X" ? "O" : "X";
                newBoard[aiMove] = aiSymbol;
                const aiWinner = checkWinner(newBoard);
                setState((prev) => ({
                    ...prev,
                    board: newBoard,
                    isPlayerTurn: true,
                    winner: aiWinner as PlayerSymbol | null,
                }));
                if (aiWinner) {
                    updateStats(aiWinner === state.playerSymbol ? "win" : "lose");
                }
            }
        }, 500);
    };

    const resetGame = () => {
        setState((prev) => ({
            ...prev,
            board: Array(9).fill(null),
            isPlayerTurn: prev.playerSymbol === "X",
            winner: null,
        }));
    };

    const changeDifficulty = (difficulty: DifficultyLevel) => {
        setState((prev) => ({
            ...prev,
            difficulty,
            board: Array(9).fill(null),
            isPlayerTurn: prev.playerSymbol === "X",
            winner: null,
        }));
    };

    const changePlayerSymbol = (symbol: PlayerSymbol) => {
        setState((prev) => ({
            ...prev,
            playerSymbol: symbol,
            board: Array(9).fill(null),
            isPlayerTurn: symbol === "X",
            winner: null,
        }));
    };

    return {
        ...state,
        handlePlayerMove,
        resetGame,
        changeDifficulty,
        changePlayerSymbol,
    };
};
