import { useState } from "react";
import { ethers } from "ethers";

export interface WalletState {
    wallet: ethers.Signer | null;
    error: string | null;
    address: string | null;
    isConnecting: boolean;
}

export const useWallet = () => {
    const [state, setState] = useState<WalletState>({
        wallet: null,
        error: null,
        address: null,
        isConnecting: false,
    });

    const connectWallet = async () => {
        if (!window.ethereum) {
            setState((prev) => ({ ...prev, error: "Zainstaluj MetaMask!" }));
            return;
        }

        setState((prev) => ({ ...prev, isConnecting: true }));

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const address = await signer.getAddress();

            // Sprawdź, czy jesteśmy na sieci Base
            const network = await provider.getNetwork();
            if (network.chainId !== 8453) {
                throw new Error("Przełącz się na sieć Base!");
            }

            setState({
                wallet: signer,
                error: null,
                address,
                isConnecting: false,
            });
        } catch (error) {
            setState({
                wallet: null,
                error: error instanceof Error ? error.message : "Błąd połączenia z portfelem",
                address: null,
                isConnecting: false,
            });
        }
    };

    const disconnectWallet = () => {
        setState({
            wallet: null,
            error: null,
            address: null,
            isConnecting: false,
        });
    };

    return {
        ...state,
        connectWallet,
        disconnectWallet,
    };
};
