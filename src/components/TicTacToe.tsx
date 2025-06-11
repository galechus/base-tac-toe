import React, { useState, useEffect } from "react";
import NeonGameModeSelector from "./NeonGameModeSelector";
import TrainingMode from "./TrainingMode";
import { sdk } from "@farcaster/frame-sdk";
import Header from "./Header";

const Placeholder: React.FC<{ label: string; onBack: () => void }> = ({ label, onBack }) => (
    <div className="neon-container" style={{ position: "relative" }}>
        <h1 className="neon-header">Base Tac Toe</h1>
        <button
            className="neon-reset"
            style={{ position: "absolute", left: 20, top: 20, minWidth: 80 }}
            onClick={onBack}
        >
            ← Back
        </button>
        <div style={{ color: "#00ff88", fontSize: "2em", margin: "2em 0" }}>
            {label} – Coming soon!
        </div>
    </div>
);

const MainApp: React.FC<{ username: string; address: string }> = ({ username, address }) => {
    const [mode, setMode] = useState<string | null>(null);
    if (!mode)
        return (
            <>
                <Header username={username} address={address} />
                <NeonGameModeSelector onSelectMode={setMode} />
            </>
        );
    if (mode === "training")
        return (
            <>
                <Header username={username} address={address} />
                <TrainingMode onBack={() => setMode(null)} />
            </>
        );
    if (mode === "vs-ai")
        return (
            <>
                <Header username={username} address={address} />
                <Placeholder label="VS AI" onBack={() => setMode(null)} />
            </>
        );
    if (mode === "vs-player")
        return (
            <>
                <Header username={username} address={address} />
                <Placeholder label="VS Player" onBack={() => setMode(null)} />
            </>
        );
    return null;
};

const FarcasterLogin: React.FC<{ onLogin: (username: string, address: string) => void }> = ({
    onLogin,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isMiniApp, setIsMiniApp] = useState(false);
    const [miniAppCheckError, setMiniAppCheckError] = useState<string | null>(null);

    useEffect(() => {
        // Sprawdź czy aplikacja jest uruchomiona w środowisku Mini App
        const checkMiniApp = async () => {
            try {
                const context = await sdk.context.isMiniApp();
                console.log("MiniApp context:", context);
                // @ts-expect-error - SDK types are not up to date
                setIsMiniApp(context.isMiniApp);
            } catch (err) {
                console.error("Error checking Mini App context:", err);
                setIsMiniApp(false);
                setMiniAppCheckError(
                    "To środowisko nie obsługuje Mini App (np. localhost, preview, ngrok). Otwórz aplikację w Warpcast."
                );
            }
        };
        checkMiniApp();
    }, []);

    const handleSignIn = async () => {
        setIsLoading(true);
        setError(null);
        try {
            if (!isMiniApp) {
                throw new Error(
                    "Aplikacja musi być uruchomiona w kliencie Farcaster (np. Warpcast)"
                );
            }
            await sdk.actions.quickAuth(); // Na razie nie używamy tokena
            // TODO: W przyszłości możemy wysłać token do backendu
            // const { token } = await sdk.actions.quickAuth();
            // const response = await fetch('https://api.example.com/auth', {
            //     headers: { Authorization: `Bearer ${token}` }
            // });
            // const data = await response.json();

            // Na razie używamy przykładowych danych
            onLogin("user", "0x...");
        } catch (err) {
            console.error("Quick Auth error:", err);
            setError(err instanceof Error ? err.message : "Błąd logowania");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="welcome-bg">
            <div className="welcome-overlay">
                <div className="welcome-content">
                    <div className="welcome-logo">
                        Base<span style={{ color: "#00ff88" }}>TacToe</span>
                    </div>
                    {miniAppCheckError ? (
                        <div style={{ color: "#ff4d4d", marginBottom: "1em" }}>
                            {miniAppCheckError}
                        </div>
                    ) : (
                        !isMiniApp && (
                            <div style={{ color: "#ff4d4d", marginBottom: "1em" }}>
                                Aplikacja musi być uruchomiona w kliencie Farcaster (np. Warpcast)
                            </div>
                        )
                    )}
                    <button
                        className="neon-reset"
                        onClick={handleSignIn}
                        disabled={isLoading || !isMiniApp}
                    >
                        {isLoading ? "Logowanie..." : "Zaloguj się przez Farcaster"}
                    </button>
                    {error && (
                        <div style={{ color: "#ff4d4d", marginTop: "1em" }}>Błąd: {error}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const TicTacToe: React.FC = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        // Wywołaj sdk.actions.ready() gdy aplikacja jest gotowa
        sdk.actions.ready({ disableNativeGestures: true }).catch(console.error);
    }, []);

    const handleLogin = (username: string, address: string) => {
        setUsername(username);
        setAddress(address);
        setIsLogged(true);
    };

    return (
        <>
            {!isLogged ? (
                <FarcasterLogin onLogin={handleLogin} />
            ) : (
                <MainApp username={username} address={address} />
            )}
        </>
    );
};

export default TicTacToe;
