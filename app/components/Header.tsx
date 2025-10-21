"use client";
import React from "react";

interface HeaderProps {
  username?: string;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ username, onBack }) => {
  return (
    <div style={{ position: "relative", width: "100%", marginBottom: "1em" }}>
      {onBack && (
        <button
          className="neon-reset"
          style={{
            position: "absolute",
            left: 20,
            top: 0,
            minWidth: 80,
            fontSize: "0.9em",
            padding: "0.6em 1.2em",
          }}
          onClick={onBack}
        >
          ← Back
        </button>
      )}
      <h1 className="neon-header">BaseTacToe</h1>
      {username && (
        <div
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.95em",
            marginTop: "-10px",
          }}
        >
          Playing as: {username}
        </div>
      )}
    </div>
  );
};

export default Header;
