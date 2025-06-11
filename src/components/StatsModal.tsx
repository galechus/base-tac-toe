import React from "react";

type Stats = {
    gamesPlayed: number;
    gamesWon: number;
    gamesLost: number;
    currentStreak: number;
    bestStreak: number;
    lastGameResult: "win" | "lose" | null;
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
    stats: Stats;
};

const StatsModal: React.FC<Props> = ({ isOpen, onClose, stats }) => {
    if (!isOpen) return null;
    const winRate =
        stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    ×
                </button>
                <h2>Training Statistics</h2>
                <div className="stats-grid">
                    <div className="stat-item">
                        <span className="stat-label">Games Played</span>
                        <span className="stat-value">{stats.gamesPlayed}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Wins</span>
                        <span className="stat-value win">{stats.gamesWon}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Losses</span>
                        <span className="stat-value lose">{stats.gamesLost}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Current Streak</span>
                        <span className="stat-value">{stats.currentStreak}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Best Streak</span>
                        <span className="stat-value">{stats.bestStreak}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Win Rate</span>
                        <span className="stat-value">{winRate}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsModal;
