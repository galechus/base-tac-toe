import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { GAME_CONSTANTS, STORAGE_KEYS, GAME_MESSAGES } from "../utils/constants";

interface GameState {
    board: (string | null)[];
    isPlayerTurn: boolean;
    credits: number;
    winner: string | null;
}

export const useGame = (wallet: ethers.Signer | null) => {
    const [state, setState] = useState<GameState>({
        board: Array(9).fill(null),
        isPlayerTurn: true,
        credits: 0,
        winner: null,
    });

    useEffect(() => {
        checkFirstTimeUser();
    }, []);

    const checkFirstTimeUser = () => {
        const firstTime = !localStorage.getItem(STORAGE_KEYS.USER);
        if (firstTime) {
            setState((prev) => ({ ...prev, credits: GAME_CONSTANTS.INITIAL_CREDITS }));
            localStorage.setItem(STORAGE_KEYS.USER, "true");
            localStorage.setItem(STORAGE_KEYS.CREDITS, GAME_CONSTANTS.INITIAL_CREDITS.toString());
        } else {
            const savedCredits = localStorage.getItem(STORAGE_KEYS.CREDITS);
            setState((prev) => ({ ...prev, credits: parseInt(savedCredits || "0") }));
        }
    };

    const buyCredits = async () => {
        if (!wallet) {
            alert(GAME_MESSAGES.CONNECT_WALLET);
            return;
        }

        try {
            const tx = await wallet.sendTransaction({
                to: GAME_CONSTANTS.CONTRACT_ADDRESS,
                value: GAME_CONSTANTS.CREDITS_COST,
                chainId: GAME_CONSTANTS.BASE_CHAIN_ID,
            });

            await tx.wait();
            const newCredits = state.credits + GAME_CONSTANTS.CREDITS_AMOUNT;
            setState((prev) => ({ ...prev, credits: newCredits }));
            localStorage.setItem(STORAGE_KEYS.CREDITS, newCredits.toString());
        } catch (error) {
            console.error(GAME_MESSAGES.ERROR.CREDITS_PURCHASE, error);
        }
    };

    const sendReward = async () => {
        if (!wallet) return;

        try {
            const tx = await wallet.sendTransaction({
                to: await wallet.getAddress(),
                value: GAME_CONSTANTS.REWARD_AMOUNT,
                chainId: GAME_CONSTANTS.BASE_CHAIN_ID,
            });
            await tx.wait();
            alert(GAME_MESSAGES.REWARD);
        } catch (error) {
            console.error(GAME_MESSAGES.ERROR.REWARD_SEND, error);
        }
    };

    const checkWinner = (squares: (string | null)[]): string | null => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8], // poziome
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8], // pionowe
            [0, 4, 8],
            [2, 4, 6], // przekątne
        ];

        for (let line of lines) {
            const [a, b, c] = line;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const handleClick = async (index: number) => {
        if (!state.credits || state.board[index] || state.winner || !state.isPlayerTurn) return;

        const newBoard = [...state.board];
        newBoard[index] = "X";

        const newCredits = state.credits - 1;
        setState((prev) => ({
            ...prev,
            board: newBoard,
            isPlayerTurn: false,
            credits: newCredits,
        }));
        localStorage.setItem(STORAGE_KEYS.CREDITS, newCredits.toString());

        const playerWinner = checkWinner(newBoard);
        if (playerWinner) {
            setState((prev) => ({ ...prev, winner: playerWinner }));
            if (playerWinner === "X") {
                await sendReward();
            }
            return;
        }

        // Ruch komputera
        setTimeout(() => {
            const computerMove = getComputerMove(newBoard);
            if (computerMove !== null) {
                newBoard[computerMove] = "O";
                setState((prev) => ({
                    ...prev,
                    board: newBoard,
                    isPlayerTurn: true,
                    winner: checkWinner(newBoard),
                }));
            }
        }, 500);
    };

    const getComputerMove = (currentBoard: (string | null)[]): number | null => {
        const emptySquares = currentBoard
            .map((square, index) => (square === null ? index : null))
            .filter((square): square is number => square !== null);

        if (emptySquares.length === 0) return null;
        return emptySquares[Math.floor(Math.random() * emptySquares.length)];
    };

    const resetGame = () => {
        setState((prev) => ({
            ...prev,
            board: Array(9).fill(null),
            isPlayerTurn: true,
            winner: null,
        }));
    };

    return {
        ...state,
        handleClick,
        resetGame,
        buyCredits,
    };
};
