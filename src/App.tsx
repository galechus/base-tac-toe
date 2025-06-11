import React from "react";
import TicTacToe from "./components/TicTacToe";

const App: React.FC = () => {
    return (
        <div style={{ minHeight: "100vh", background: "#000000" }}>
            <TicTacToe />
        </div>
    );
};

export default App;
