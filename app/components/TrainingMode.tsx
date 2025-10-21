"use client";
import React, { useState } from "react";
import { useTrainingMode } from "../hooks/useTrainingMode";
import { DifficultyLevel } from "../utils/types";
import StatsModal from "./StatsModal";
import NeonXO from "./NeonXO";
import Header from "./Header";

interface TrainingModeProps {
  onBack: () => void;
  username?: string;
}

const TrainingMode: React.FC<TrainingModeProps> = ({ onBack, username }) => {
  const {
    board,
    isPlayerTurn,
    winner,
    playerSymbol,
    handlePlayerMove,
    resetGame,
    changeDifficulty,
    stats,
    difficulty,
  } = useTrainingMode();

  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

  const getStatusMessage = () => {
    if (winner) {
      if (winner === "draw") return "It's a draw! 🤝";
      return winner === playerSymbol ? "You won! 🎉" : "AI wins! 😢";
    }
    return isPlayerTurn
      ? `Your turn: ${playerSymbol}`
      : `AI's turn: ${playerSymbol === "X" ? "O" : "X"}`;
  };

  return (
    <div className="neon-container">
      <Header username={username} onBack={onBack} />

      <div className="neon-status">{getStatusMessage()}</div>

      <div style={{ marginBottom: "1.5em" }}>
        <div
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.1em",
            marginBottom: "0.7em",
          }}
        >
          Difficulty Level
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
              opacity: !isPlayerTurn && !winner ? 0.6 : 1,
            }}
          >
            {square && <NeonXO value={square} />}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: "1em",
          marginTop: "1em",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <button className="neon-reset" onClick={resetGame}>
          Reset Game
        </button>
        <button
          className="neon-reset"
          style={{ fontSize: "0.95em", padding: "0.7em 1.5em" }}
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
    </div>
  );
};

export default TrainingMode;
