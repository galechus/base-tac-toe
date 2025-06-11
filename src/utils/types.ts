export type PlayerSymbol = "X" | "O";

export enum DifficultyLevel {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

export interface TrainingStats {
    gamesPlayed: number;
    gamesWon: number;
    gamesLost: number;
    currentStreak: number;
    bestStreak: number;
    lastGameResult: "win" | "lose" | null;
}

export interface TrainingModeState {
    difficulty: DifficultyLevel;
    stats: TrainingStats;
    isPlayerTurn: boolean;
    board: (PlayerSymbol | null)[];
    winner: PlayerSymbol | null;
    playerSymbol: PlayerSymbol;
    gameHistory: {
        difficulty: DifficultyLevel;
        result: "win" | "lose";
        date: Date;
        playerSymbol: PlayerSymbol;
    }[];
}
