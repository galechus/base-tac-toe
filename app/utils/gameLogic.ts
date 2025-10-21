import { Board, Player, DifficultyLevel } from "./types";
import { WINNING_LINES } from "./constants";

export function checkWinner(board: Board): Player | "draw" | null {
  // Check for winner
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player;
    }
  }

  // Check for draw
  if (board.every((square) => square !== null)) {
    return "draw";
  }

  return null;
}

export function getEmptySquares(board: Board): number[] {
  return board
    .map((square, index) => (square === null ? index : null))
    .filter((index): index is number => index !== null);
}

// Minimax algorithm for AI
function minimax(
  board: Board,
  depth: number,
  isMaximizing: boolean,
  aiSymbol: Player,
  playerSymbol: Player
): number {
  const winner = checkWinner(board);

  if (winner === aiSymbol) return 10 - depth;
  if (winner === playerSymbol) return depth - 10;
  if (winner === "draw") return 0;

  const emptySquares = getEmptySquares(board);

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const index of emptySquares) {
      board[index] = aiSymbol;
      const score = minimax(board, depth + 1, false, aiSymbol, playerSymbol);
      board[index] = null;
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const index of emptySquares) {
      board[index] = playerSymbol;
      const score = minimax(board, depth + 1, true, aiSymbol, playerSymbol);
      board[index] = null;
      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
}

export function getAIMove(
  board: Board,
  aiSymbol: Player,
  playerSymbol: Player,
  difficulty: DifficultyLevel
): number | null {
  const emptySquares = getEmptySquares(board);

  if (emptySquares.length === 0) return null;

  // Easy: Random move
  if (difficulty === DifficultyLevel.EASY) {
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }

  // Medium: 50% optimal, 50% random
  if (difficulty === DifficultyLevel.MEDIUM) {
    if (Math.random() < 0.5) {
      return emptySquares[Math.floor(Math.random() * emptySquares.length)];
    }
  }

  // Hard (and Medium 50% of the time): Use Minimax
  let bestScore = -Infinity;
  let bestMove: number | null = null;

  for (const index of emptySquares) {
    board[index] = aiSymbol;
    const score = minimax(board, 0, false, aiSymbol, playerSymbol);
    board[index] = null;

    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  }

  return bestMove;
}
