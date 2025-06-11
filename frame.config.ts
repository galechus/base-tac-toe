interface FrameConfig {
    appName: string;
    imageUrl: string;
    buttons: {
        connectWallet: string;
        signIn: string;
    };
    theme: {
        primary: string;
        secondary: string;
        text: string;
        background: string;
    };
    network: {
        chainId: number;
    };
}

const frameConfig: FrameConfig = {
    appName: "BaseTacToe",
    imageUrl: "https://base-tac-toe.vercel.app/logo.png", // Zaktualizuj ten URL po wdrożeniu
    buttons: {
        connectWallet: "Połącz portfel",
        signIn: "Zaloguj się przez Farcaster",
    },
    theme: {
        primary: "#794CFF",
        secondary: "#121212",
        text: "#FFFFFF",
        background: "#000000",
    },
    network: {
        chainId: 8453, // Base Chain ID
    },
};

export default frameConfig;
