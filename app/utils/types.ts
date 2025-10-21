export type Player = "X" | "O";
export type Square = Player | null;
export type Board = Square[];

export enum DifficultyLevel {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export interface GameStats {
  wins: number;
  losses: number;
  draws: number;
  totalGames: number;
  winRate: number;
}

export interface GameState {
  board: Board;
  isPlayerTurn: boolean;
  winner: Player | "draw" | null;
  playerSymbol: Player;
  difficulty: DifficultyLevel;
}
