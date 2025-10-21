const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/**
 * MiniApp configuration object. Must follow the Farcaster MiniApp specification.
 *
 * @see {@link https://miniapps.farcaster.xyz/docs/guides/publishing}
 */
export const minikitConfig = {
  accountAssociation: {
    header:
      "eyJmaWQiOjE5NTcyNCwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDE5QTM1YTdEYkM0NzJhNDlDQWJFOTlCYzczYkZlRTEyQWEwMjVmNTEifQ",
    payload: "eyJkb21haW4iOiJiYXNlLXRhYy10b2UudmVyY2VsLmFwcCJ9",
    signature:
      "dU4fmHWyNw1F2caDjrZG9C6/T70lZwgtc2MGNTjm+zEbXi5mb+X9Nyj2bZFzmgMV8lkcLq1HehIscK1+DCmzSxw=",
  },
  baseBuilder: {
    allowedAddresses: ["0x203e007e7f314A4b4258d0cbb3226Eac1A287d8D"],
  },
  miniapp: {
    version: "1",
    name: "BaseTacToe",
    subtitle: "Tic-Tac-Toe on Base",
    description:
      "Play classic Tic-Tac-Toe! Train against AI, challenge friends, and dominate the board on Base chain.",
    screenshotUrls: [`${ROOT_URL}/screenshot.png`],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#0a0a1a",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "games",
    tags: ["game", "tictactoe", "ai", "multiplayer", "base"],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    tagline: "Master the board",
    ogTitle: "BaseTacToe - Tic-Tac-Toe Game",
    ogDescription: "Play classic Tic-Tac-Toe on Base chain!",
    ogImageUrl: `${ROOT_URL}/hero.png`,
    noindex: false,
  },
} as const;
