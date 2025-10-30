# Backend Service for Pong-It

This directory contains the backend service for the Pong-It game, powering the multiplayer gameplay, blockchain interactions, and game state management.

## 🏗️ Architecture

The backend is built with a modular architecture focusing on real-time gaming and blockchain integration:

### Core Components

- **Game Engine** (`gameLogic.js`, `gameManager.js`)
  - 60 FPS physics engine
  - Collision detection
  - Score tracking
  - Power-up mechanics

- **Multiplayer System** (`multiplayerHandler.js`, `roomManager.js`)
  - Real-time WebSocket communication
  - Room management
  - Match state synchronization
  - Spectator mode support

- **Blockchain Integration** (`services/`)
  - Smart contract interactions
  - Transaction signing
  - Winner verification
  - Power-up state management

### Data Models

- **Game** - Match state and history
- **Player** - User profiles and statistics
- **PowerUpState** - NFT ownership and usage
- **PowerUpDelegation** - Token rental tracking

## 🛠️ Technology Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Real-time**: Socket.IO 4.x
- **Database**: MongoDB
- **Blockchain**: 
  - Hedera SDK
  - ethers.js for contract interaction
  - ECDSA for signatures

## Setup and Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables:
   Create a `.env` file with:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   HEDERA_NETWORK=testnet
   POWERUP_SIGNER_ADDRESS=your_wallet_address
   POWERUP_SIGNER_PRIVATE_KEY=your_private_key
   ```

3. Run the server:
   ```bash
   pnpm start
   ```

For development:
```bash
pnpm run dev
```

## API Endpoints

- `/api/games` - Game management
- `/api/players` - Player management
- `/api/leaderboard` - Leaderboard data
- WebSocket endpoints for real-time game communication

## Testing

Run tests with:
```bash
pnpm test
```