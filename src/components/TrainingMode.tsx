import React, { useState } from "react";
import { useTrainingMode } from "../hooks/useTrainingMode";
import { DifficultyLevel } from "../utils/types";
import StatsModal from "./StatsModal";
import NeonXO from "./NeonXO";
import "../styles/NeonTicTacToe.css";

const TrainingMode: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const {
        board,
        isPlayerTurn,
        winner,
        playerSymbol,
        handlePlayerMove,
        resetGame,
        changeDifficulty,
        changePlayerSymbol,
        stats,
        difficulty,
    } = useTrainingMode();
    const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

    return (
        <div className="neon-container">
            <h1 className="neon-header">Base Tac Toe</h1>
            <button
                className="neon-reset"
                style={{ position: "absolute", left: 20, top: 20, minWidth: 80 }}
                onClick={onBack}
            >
                ← Back
            </button>
            <div className="neon-status">
                {winner
                    ? winner === playerSymbol
                        ? "You won! 🎉"
                        : "You lost! 😢"
                    : isPlayerTurn
                    ? `Your turn: ${playerSymbol}`
                    : `AI's turn: ${playerSymbol === "X" ? "O" : "X"}`}
            </div>
            <div style={{ marginBottom: "1.5em" }}>
                <div style={{ color: "#b0b0b0", fontSize: "1.1em", marginBottom: "0.7em" }}>
                    Difficulty
                </div>
                <div className="neon-difficulty-grid">
                    <button
                        className={`neon-difficulty-btn${
                            difficulty === DifficultyLevel.EASY ? " active" : ""
                        }`}
                        onClick={() => changeDifficulty(DifficultyLevel.EASY)}
                    >
                        Easy
                    </button>
                    <button
                        className={`neon-difficulty-btn${
                            difficulty === DifficultyLevel.MEDIUM ? " active" : ""
                        }`}
                        onClick={() => changeDifficulty(DifficultyLevel.MEDIUM)}
                    >
                        Medium
                    </button>
                    <button
                        className={`neon-difficulty-btn${
                            difficulty === DifficultyLevel.HARD ? " active" : ""
                        }`}
                        onClick={() => changeDifficulty(DifficultyLevel.HARD)}
                    >
                        Hard
                    </button>
                </div>
            </div>
            <div className="neon-board">
                {board.map((square, index) => (
                    <div
                        key={index}
                        className="neon-cell"
                        onClick={() => handlePlayerMove(index)}
                        style={{
                            pointerEvents:
                                !isPlayerTurn || Boolean(winner) || Boolean(square)
                                    ? "none"
                                    : "auto",
                        }}
                    >
                        {square && <NeonXO value={square} />}
                    </div>
                ))}
            </div>
            <button className="neon-reset" onClick={resetGame}>
                Reset Game
            </button>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1em" }}>
                <button
                    className="neon-reset"
                    style={{ fontSize: "0.95em", padding: "0.5em 1.2em" }}
                    onClick={() => setIsStatsModalOpen(true)}
                >
                    📊 Statistics
                </button>
            </div>
            <StatsModal
                isOpen={isStatsModalOpen}
                onClose={() => setIsStatsModalOpen(false)}
                stats={stats}
            />
            <SignInButton />
        </div>
    );
};

export default TrainingMode;
