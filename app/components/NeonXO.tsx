"use client";
import React from "react";

interface NeonXOProps {
  value: "X" | "O";
}

const NeonXO: React.FC<NeonXOProps> = ({ value }) => {
  const color = "#3C8AFF"; // Cerulean from palette

  if (value === "X") {
    return (
      <svg width="60" height="60" viewBox="0 0 60 60">
        <line
          x1="10"
          y1="10"
          x2="50"
          y2="50"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="50"
          y1="10"
          x2="10"
          y2="50"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg width="60" height="60" viewBox="0 0 60 60">
      <circle
        cx="30"
        cy="30"
        r="18"
        stroke={color}
        strokeWidth="6"
        fill="none"
      />
    </svg>
  );
};

export default NeonXO;
