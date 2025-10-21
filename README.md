# BaseTacToe - Neon Tic-Tac-Toe Mini App

BaseTacToe is a Tic-Tac-Toe game built as a Mini App for Base and Farcaster. Play against AI with three difficulty levels, track your statistics, and dominate the neon grid!

## ✨ Features

- 🎯 **Training Mode** - Play against AI with 3 difficulty levels (Easy, Medium, Hard)
- 📊 **Statistics** - Track wins, losses, draws, and win rate
- 🎨 **Neon Design** - Modern interface with a 16-color palette
- 💾 **Local Storage** - Your stats and preferences are saved automatically
- 🔜 **Coming Soon** - VS AI and VS Player modes

## 📋 Prerequisites

Before getting started, make sure you have:

- **Base app** account
- **[Farcaster](https://farcaster.xyz/)** account
- **[Vercel](https://vercel.com/)** account for hosting
- **[Coinbase Developer Platform](https://portal.cdp.coinbase.com/)** Client API Key

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file and add your variables:

```bash
NEXT_PUBLIC_PROJECT_NAME="BaseTacToe"
NEXT_PUBLIC_ONCHAINKIT_API_KEY=<Your-CDP-API-KEY>
NEXT_PUBLIC_URL=http://localhost:3000
```

**How to get CDP API Key:**

1. Go to [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)
2. Sign in / Create an account
3. Create a new project or select existing one
4. Copy the API Key from the dashboard

### 3. Run locally

```bash
npm run dev
```

The app will be available at: `http://localhost:3000`

## 🎨 Customization

### Update Manifest

The `minikit.config.ts` file configures your Mini App manifest.

**Skip the `accountAssociation` object for now - we'll add it during deployment.**

You can customize:

- `name` - Application name
- `subtitle` - Subtitle
- `description` - App description
- `tags` - Search tags
- Images in `/public` folder (icon.png, hero.png, screenshot.png, splash.png)

## 📦 Deployment

### 1. Deploy to Vercel

If you don't have Vercel CLI installed:

```bash
npm install -g vercel
```

Then deploy:

```bash
vercel --prod
```

You'll receive a URL like: `https://base-tac-toe.vercel.app/`

### 2. Update environment variables

Update your `.env.local` file with the production URL:

```bash
NEXT_PUBLIC_PROJECT_NAME="BaseTacToe"
NEXT_PUBLIC_ONCHAINKIT_API_KEY=<Your-CDP-API-KEY>
NEXT_PUBLIC_URL=https://base-tac-toe.vercel.app/
```

### 3. Add environment variables to Vercel

```bash
vercel env add NEXT_PUBLIC_PROJECT_NAME production
vercel env add NEXT_PUBLIC_ONCHAINKIT_API_KEY production
vercel env add NEXT_PUBLIC_URL production
```

## 🔐 Account Association

### 1. Generate Account Association

After deployment:

1. Go to [Base Build Account Association Tool](https://build.base.org)
2. Paste your domain (e.g., `base-tac-toe.vercel.app`)
3. Click "Submit"
4. Click "Verify" and follow the instructions
5. Copy the generated `accountAssociation` object

### 2. Update configuration

Add `accountAssociation` to `minikit.config.ts`:

```ts
export const minikitConfig = {
  accountAssociation: {
    header: "your-header-here",
    payload: "your-payload-here",
    signature: "your-signature-here",
  },
  miniapp: {
    // ... reszta konfiguracji
  },
} as const;
```

### 3. Redeploy

```bash
vercel --prod
```

## ✅ Testing and Publishing

### 1. Test your app

Go to [base.build/preview](https://build.base.org) to test:

1. Add your app URL
2. Check the embeds and click the launch button
3. Verify "Account association" in the tab
4. Check "Metadata" to ensure all fields are correct

### 2. Publish to Base App

To publish your app:

1. Open the Base app
2. Create a post with your app's URL
3. The app will appear as a Mini App in the feed

## 🎮 How to Play

1. **Choose game mode** - Training Mode is currently available
2. **Select difficulty level** - Easy, Medium, or Hard
3. **Play!** - Click on the board to make your move
4. **Check statistics** - Click the "📊 Statistics" button

## 📁 Project Structure

```
app/
├── components/          # React components
│   ├── GameModeSelector.tsx
│   ├── TrainingMode.tsx
│   ├── NeonXO.tsx
│   ├── Header.tsx
│   ├── StatsModal.tsx
│   └── Placeholder.tsx
├── hooks/              # Custom React hooks
│   └── useTrainingMode.ts
├── utils/              # Utility functions
│   ├── types.ts
│   ├── constants.ts
│   └── gameLogic.ts
├── globals.css         # Global styles
└── page.tsx           # Main page
```

## 🎨 16-Color Palette

The app uses a precisely defined color palette:

- **Primary**: #3C8AFF (Cerulean)
- **Backgrounds**: Grayscale from #0A0B0D to #FFFFFF
- **Accents**: Green (#66C800), Red (#FC401F), Yellow (#FFD12F)

## 🔮 Roadmap

- [ ] VS AI Mode - Advanced AI modes
- [ ] VS Player Mode - Local/online multiplayer
- [ ] Blockchain integration - Rewards in Base tokens
- [ ] Leaderboard - Global ranking
- [ ] Tournament mode

## 📚 Learn More

- [Base Mini Apps Documentation](https://docs.base.org/mini-apps/)
- [OnchainKit Documentation](https://onchainkit.xyz/)
- [Farcaster Developer Docs](https://docs.farcaster.xyz/)

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

## 📄 License

MIT

---

Built with ❤️ for the Base and Farcaster community
