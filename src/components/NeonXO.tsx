import React from "react";

type Props = {
    value: "X" | "O";
};

const NeonXO: React.FC<Props> = ({ value }) => {
    if (value === "X") {
        return (
            <svg viewBox="0 0 100 100">
                <line
                    x1="20"
                    y1="20"
                    x2="80"
                    y2="80"
                    stroke="#ff4d4d"
                    strokeWidth="10"
                    strokeLinecap="round"
                    filter="url(#glowX)"
                />
                <line
                    x1="20"
                    y1="80"
                    x2="80"
                    y2="20"
                    stroke="#ff4d4d"
                    strokeWidth="10"
                    strokeLinecap="round"
                    filter="url(#glowX)"
                />
                <defs>
                    <filter id="glowX" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#ff4d4d" />
                    </filter>
                </defs>
            </svg>
        );
    }
    return (
        <svg viewBox="0 0 100 100">
            <circle
                cx="50"
                cy="50"
                r="35"
                stroke="#00ff88"
                strokeWidth="10"
                fill="none"
                filter="url(#glowO)"
            />
            <defs>
                <filter id="glowO" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00ff88" />
                </filter>
            </defs>
        </svg>
    );
};

export default NeonXO;
