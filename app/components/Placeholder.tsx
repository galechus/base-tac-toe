"use client";
import React from "react";
import Header from "./Header";

interface PlaceholderProps {
  label: string;
  onBack: () => void;
  username?: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({
  label,
  onBack,
  username,
}) => (
  <div className="neon-container">
    <Header username={username} onBack={onBack} />
    <div
      style={{
        color: "var(--primary)",
        fontSize: "2em",
        margin: "2em 0",
      }}
    >
      {label}
    </div>
    <div style={{ color: "var(--text-secondary)", fontSize: "1.2em" }}>
      Coming Soon! 🚀
    </div>
  </div>
);

export default Placeholder;
