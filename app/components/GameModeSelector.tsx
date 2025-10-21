"use client";
import React from "react";

interface GameModeSelectorProps {
  onSelectMode: (mode: string) => void;
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({
  onSelectMode,
}) => {
  return (
    <div className="neon-container">
      <h1 className="neon-header">BaseTacToe</h1>
      <div
        style={{
          margin: "2.5em 0 1.5em 0",
          color: "var(--text-secondary)",
          fontSize: "1.2em",
        }}
      >
        Choose your play mode
      </div>
      <div className="neon-mode-grid">
        <button
          className="neon-mode-card"
          onClick={() => onSelectMode("training")}
        >
          🎯
          <br />
          Training
          <br />
          <span className="neon-mode-desc">
            Train against AI with difficulty levels
          </span>
        </button>
        <button
          className="neon-mode-card"
          onClick={() => onSelectMode("vs-ai")}
        >
          🤖
          <br />
          VS AI
          <br />
          <span className="neon-mode-desc">
            Challenge advanced AI (Coming Soon)
          </span>
        </button>
        <button
          className="neon-mode-card"
          onClick={() => onSelectMode("vs-player")}
        >
          👥
          <br />
          VS Player
          <br />
          <span className="neon-mode-desc">
            Play with a friend (Coming Soon)
          </span>
        </button>
      </div>
    </div>
  );
};

export default GameModeSelector;
