export const STORAGE_KEYS = {
  STATS: "basetactoe_stats",
  DIFFICULTY: "basetactoe_difficulty",
  PLAYER_SYMBOL: "basetactoe_player_symbol",
} as const;

export const WINNING_LINES = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal \
  [2, 4, 6], // Diagonal /
] as const;

export const INITIAL_STATS = {
  wins: 0,
  losses: 0,
  draws: 0,
  totalGames: 0,
  winRate: 0,
} as const;
