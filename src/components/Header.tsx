import React from "react";
import "../styles/Header.css";

interface HeaderProps {
    username: string;
    address: string;
}

function shortenAddress(addr: string) {
    return addr ? addr.slice(0, 6) + "..." + addr.slice(-4) : "";
}

const Header: React.FC<HeaderProps> = ({ username, address }) => (
    <header className="app-header">
        <div className="header-left">
            <img src="/logo.png" alt="logo" className="header-logo" />
            <span className="header-title">
                Base<span style={{ color: "#00ff88" }}>TacToe</span>
            </span>
        </div>
        <div className="header-user">
            <span className="header-username">@{username}</span>
            <span className="header-address">{shortenAddress(address)}</span>
        </div>
    </header>
);

export default Header;
