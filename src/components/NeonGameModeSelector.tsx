import React from "react";
import "../styles/NeonTicTacToe.css";

interface Props {
    onSelectMode: (mode: string) => void;
}

const NeonGameModeSelector: React.FC<Props> = ({ onSelectMode }) => (
    <div className="neon-container">
        <h1 className="neon-header">Base Tac Toe</h1>
        <div style={{ margin: "2.5em 0 1.5em 0", color: "#b0b0b0", fontSize: "1.2em" }}>
            Choose your play mode
        </div>
        <div className="neon-mode-grid">
            <button className="neon-mode-card" onClick={() => onSelectMode("training")}>
                🎯
                <br />
                Training
                <br />
                <span className="neon-mode-desc">Train against AI</span>
            </button>
            <button className="neon-mode-card" onClick={() => onSelectMode("vs-ai")}>
                🤖
                <br />
                VS AI
                <br />
                <span className="neon-mode-desc">Challenge advanced AI</span>
            </button>
            <button className="neon-mode-card" onClick={() => onSelectMode("vs-player")}>
                👥
                <br />
                VS Player
                <br />
                <span className="neon-mode-desc">Play with a friend</span>
            </button>
        </div>
    </div>
);

export default NeonGameModeSelector;
