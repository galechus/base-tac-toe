"use client";
import React from "react";
import { GameStats } from "../utils/types";

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: GameStats;
}

const StatsModal: React.FC<StatsModalProps> = ({ isOpen, onClose, stats }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "var(--bg-card)",
          borderRadius: "16px",
          padding: "2em",
          maxWidth: "400px",
          width: "90%",
          border: "2px solid var(--primary)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          style={{
            color: "var(--primary)",
            fontSize: "2em",
            marginBottom: "1em",
            textAlign: "center",
          }}
        >
          📊 Statistics
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <StatRow label="Total Games" value={stats.totalGames} />
          <StatRow label="Wins" value={stats.wins} color="#66C800" />
          <StatRow label="Losses" value={stats.losses} color="#FC401F" />
          <StatRow label="Draws" value={stats.draws} color="#FFD12F" />
          <StatRow
            label="Win Rate"
            value={`${stats.winRate}%`}
            color="var(--primary)"
          />
        </div>

        <button
          className="neon-reset"
          style={{
            width: "100%",
            marginTop: "1.5em",
          }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const StatRow: React.FC<{
  label: string;
  value: string | number;
  color?: string;
}> = ({ label, value, color = "var(--text-primary)" }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "0.8em",
      backgroundColor: "var(--bg-cell)",
      borderRadius: "8px",
    }}
  >
    <span style={{ color: "var(--text-secondary)" }}>{label}:</span>
    <span style={{ color, fontWeight: "bold", fontSize: "1.1em" }}>
      {value}
    </span>
  </div>
);

export default StatsModal;
