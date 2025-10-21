"use client";
import { useState, useEffect } from "react";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import GameModeSelector from "./components/GameModeSelector";
import TrainingMode from "./components/TrainingMode";
import Placeholder from "./components/Placeholder";

export default function Home() {
  const { isFrameReady, setFrameReady, context } = useMiniKit();
  const [mode, setMode] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");

  // Initialize the miniapp
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  // Get username from context
  useEffect(() => {
    if (context?.user?.displayName) {
      setUsername(context.user.displayName);
    } else if (context?.user?.username) {
      setUsername(context.user.username);
    }
  }, [context]);

  // Mode selector screen
  if (!mode) {
    return <GameModeSelector onSelectMode={setMode} />;
  }

  // Training mode screen
  if (mode === "training") {
    return <TrainingMode onBack={() => setMode(null)} username={username} />;
  }

  // VS AI mode (coming soon)
  if (mode === "vs-ai") {
    return (
      <Placeholder
        label="VS AI Mode"
        onBack={() => setMode(null)}
        username={username}
      />
    );
  }

  // VS Player mode (coming soon)
  if (mode === "vs-player") {
    return (
      <Placeholder
        label="VS Player Mode"
        onBack={() => setMode(null)}
        username={username}
      />
    );
  }

  return null;
}
