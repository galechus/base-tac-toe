"use client";
import { useState, useEffect, useCallback } from "react";
import { Board, Player, DifficultyLevel, GameStats } from "../utils/types";
import { checkWinner, getAIMove } from "../utils/gameLogic";
import { STORAGE_KEYS, INITIAL_STATS } from "../utils/constants";

export function useTrainingMode() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<Player | "draw" | null>(null);
  const [playerSymbol, setPlayerSymbol] = useState<Player>("X");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(
    DifficultyLevel.MEDIUM
  );
  const [stats, setStats] = useState<GameStats>(INITIAL_STATS);

  // Load stats and preferences from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedStats = localStorage.getItem(STORAGE_KEYS.STATS);
      const savedDifficulty = localStorage.getItem(STORAGE_KEYS.DIFFICULTY);
      const savedSymbol = localStorage.getItem(STORAGE_KEYS.PLAYER_SYMBOL);

      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
      if (savedDifficulty) {
        setDifficulty(savedDifficulty as DifficultyLevel);
      }
      if (savedSymbol) {
        setPlayerSymbol(savedSymbol as Player);
      }
    }
  }, []);

  // Save stats to localStorage
  const saveStats = useCallback((newStats: GameStats) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(newStats));
      setStats(newStats);
    }
  }, []);

  // AI move effect
  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const aiSymbol = playerSymbol === "X" ? "O" : "X";
      const timer = setTimeout(() => {
        const aiMove = getAIMove(board, aiSymbol, playerSymbol, difficulty);
        if (aiMove !== null) {
          const newBoard = [...board];
          newBoard[aiMove] = aiSymbol;
          setBoard(newBoard);

          const result = checkWinner(newBoard);
          if (result) {
            setWinner(result);
            updateStats(result);
          } else {
            setIsPlayerTurn(true);
          }
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, winner, board, playerSymbol, difficulty]);

  const updateStats = (result: Player | "draw") => {
    const newStats = { ...stats };
    newStats.totalGames += 1;

    if (result === playerSymbol) {
      newStats.wins += 1;
    } else if (result === "draw") {
      newStats.draws += 1;
    } else {
      newStats.losses += 1;
    }

    newStats.winRate =
      newStats.totalGames > 0
        ? Math.round((newStats.wins / newStats.totalGames) * 100)
        : 0;

    saveStats(newStats);
  };

  const handlePlayerMove = (index: number) => {
    if (board[index] || !isPlayerTurn || winner) return;

    const newBoard = [...board];
    newBoard[index] = playerSymbol;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      updateStats(result);
    } else {
      setIsPlayerTurn(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(playerSymbol === "X");
    setWinner(null);
  };

  const changeDifficulty = (newDifficulty: DifficultyLevel) => {
    setDifficulty(newDifficulty);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.DIFFICULTY, newDifficulty);
    }
    resetGame();
  };

  const changePlayerSymbol = (symbol: Player) => {
    setPlayerSymbol(symbol);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PLAYER_SYMBOL, symbol);
    }
    resetGame();
  };

  return {
    board,
    isPlayerTurn,
    winner,
    playerSymbol,
    difficulty,
    stats,
    handlePlayerMove,
    resetGame,
    changeDifficulty,
    changePlayerSymbol,
  };
}
