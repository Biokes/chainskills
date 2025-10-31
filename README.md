#  🎮 ChainSkills: Web3 Multiplayer PING-PONG Game on Hedera

> A blockchain-powered multiplayer Pong game with NFT power-ups and crypto staking on Hedera

A modern reimagining of the classic Pong game built on the Hedera network, featuring real-time multiplayer gameplay, NFT power-ups, and competitive matches with crypto staking. Players can compete in instant matches, collect and use unique power-ups, stake HBAR on games, and climb the global leaderboard.

---

## ✨ Key Features

- ⚡ **Real-time Multiplayer**: 60 FPS synchronized gameplay
- 🎁 **NFT Power-ups**: Collectable and tradeable in-game boosts on Hedera
- 💰 **Crypto Staking**: Bet on matches with secure HBAR escrow
- 🏆 **Global Leaderboard**: ELO-based ranking system
- 👁️ **Spectator Mode**: Watch live matches in real-time

---

## 🛠 Technology Stack

### 🎨 Frontend
- React 18 + TypeScript
- Vite for build tooling
- Socket.IO for real-time communication
- HTML5 Canvas for game rendering

### 🔧 Backend
- Node.js + Express
- Socket.IO for WebSocket handling
- MongoDB for data persistence
- ECDSA for signature verification

### ⛓️ Blockchain (Hedera)
- **Hedera Smart Contracts** (Solidity)
- **Hedera Token Service (HTS)**
- **NFT (ERC-1155)** for power-ups
- **Hedera Consensus Service (HCS)**
- **Hedera JSON-RPC Relay** for contract interactions

---

## 🎮 Game Features

### ⚙️ Power-Up System
- **Speed Surge**: Temporary paddle acceleration
- **Guardian Shield**: Energy barrier blocking goals
- **Multiball Mayhem**: Split ball into multiple projectiles

### 🥊 Competitive Play
- Real-time multiplayer matches
- HBAR staking with secure escrow
- Global leaderboard with ELO ranking
- Match history and statistics
- Spectator mode for live games

### ⛓️ Blockchain Features
- NFT power-ups (ERC-1155) minted on Hedera
- Secure match stakes via PongEscrow
- Verifiable outcomes with ECDSA signatures
- Power-up trading capabilities
- Daily reward crates

---

## 🚀 Getting Started

### 📋 Prerequisites
- Node.js 18+
- pnpm package manager
- Hedera testnet account
- HashPack or MetaMask wallet with Hedera support

### 💻 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/biokes/chainskills.git
   cd chainskills
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   # Backend (.env)
   HEDERA_OPERATOR_ID=your_operator_id
   HEDERA_OPERATOR_KEY=your_operator_key
   MONGODB_URI=your_mongodb_uri
   HEDERA_NETWORK=testnet

   # Frontend (.env)
   VITE_HEDERA_NETWORK=testnet
   VITE_HEDERA_CONTRACT_ADDRESS=your_contract_address
   ```

4. Start the development servers:
   ```bash
   # Terminal 1 - Backend
   cd backend && pnpm start

   # Terminal 2 - Frontend
   cd frontend && pnpm dev
   ```

Visit `http://localhost:5173` to start playing!

---

## 📐 Technical Architecture

### 🏗️ System Components

```
┌──────────────────────┐      ┌──────────────────────┐      ┌──────────────────┐
│   Frontend           │      │    Backend           │      │   Smart          │
│   (React +           │◄────►│  (Node.js +          │◄────►│   Contracts      │
│   Hedera SDK)        │ WS   │   Socket.IO)         │ RPC  │  (Hedera Chain)  │
│                      │      │                      │      │                  │
│  - Hashgraph SDK     │      │  - Game Engine       │      │  - PowerUps      │
│  - ethers.js         │      │  - MongoDB           │      │  - Escrow        │
│  - TypeScript        │      │  - ECDSA Signatures  │      │                  │
└──────────────────────┘      └──────────────────────┘      └──────────────────┘
```

### ⛓️ Blockchain Layer

**Hedera Testnet**
- **Chain ID:** 296
- **RPC Relay:** `https://testnet.hashio.io/api`
- **Explorer:** `https://hashscan.io/testnet`
- **Native Token:** HBAR
- **Faucet:** `https://portal.hedera.com/`

**Smart Contract Interactions:**
- **Power-Up Minting** - Backend mints NFTs via MINTER_ROLE
- **Crate Opening** - Players call `openDailyCrate()` via Hedera contract
- **Delegation** - Players call `delegateBoost()` for NFT rentals
- **Staking** - Players call escrow functions for match stakes
- **Prize Claiming** - Winners call `claimPrize()` with backend signature
- **Refunds** - Players call refund functions based on match state

---

## 🔐 Smart Contracts

### 🎁 PongPowerUps (ERC-1155 on Hedera)
**Contract Address:** `0xA1c559E26B3cEB67B79C804FF2321A62A52Fce51`

**Features:**
- **NFT Power-ups** - ERC-1155 multi-token standard on Hedera
- **Power-Up Delegation System** - Time-boxed NFT rentals with expiration
- **Role-Based Access Control** - MINTER_ROLE, GAME_ROLE, DEFAULT_ADMIN_ROLE
- **Daily Crates** - Commitment-reveal loot system for winners
- **Security** - OpenZeppelin contracts + ReentrancyGuard + Pausable

**Key Functions:**
```solidity
mintBoost(address to, uint256 id, uint256 amount, bytes32 context)
consumeBoost(address owner, uint256 id, uint256 amount)
delegateBoost(address renter, uint256 id, uint256 amount, uint64 expiresAt)
openDailyCrate(uint256 nonce, bytes32 serverSecret) returns (uint256)
```

### 💳 PongEscrow (Trustless Staking)
**Contract Address:** `0x4C21eB957191F0dc63AE0b834C9A253f4A205422`

**Features:**
- **Room-based Staking** - Player 1 creates match and stakes HBAR
- **Equal Stake Matching** - Player 2 must match stake exactly
- **Prize Claiming** - Winner withdraws 2× stake with signature verification
- **Three Refund Mechanisms** - Timeout, Abandoned, Expired match handling
- **Security** - CEI pattern + ReentrancyGuard + Pausable

**Preset Stake Amounts:**
- 0.1 HBAR (micro stakes)
- 0.5 HBAR (low stakes)
- 1 HBAR (medium stakes)
- 5 HBAR (high stakes)

---

## 🎯 Multiplayer Modes

### 🎲 Game Modes
- **Quick Match** - Instant random matchmaking
- **Private Rooms** - 6-character codes for friends
- **Spectator Mode** - Watch live games in real-time
- **Staked Matches** - Competitive games with HBAR stakes

### 🏅 Ranking System
- **ELO Rating** - Chess-style ranking with K-factor 32
- **Live Leaderboard** - Top 10 players with real-time updates via Hedera
- **Player Statistics** - Wins, losses, win rate, total earnings
- **Game History** - Full match records with filtering

---

## 📂 Project Structure

```
chainskills/
├── 📁 hardhat-blockchain/           # Smart Contracts
│   ├── contracts/
│   │   ├── PongPowerUps.sol        # ERC-1155 NFT power-ups
│   │   └── PongEscrow.sol          # HBAR staking escrow
│   ├── ignition/modules/           # Hedera deployment scripts
│   ├── deployments/                # Hedera deployment records
│   └── test/                       # Contract tests
│
├── 📁 backend/                     # Node.js Game Server
│   ├── src/
│   │   ├── server.js              # Express + Socket.IO setup
│   │   ├── multiplayerHandler.js  # WebSocket events
│   │   ├── gameManager.js         # 60 FPS physics engine
│   │   ├── roomManager.js         # Matchmaking
│   │   ├── leaderboardManager.js  # ELO calculations
│   │   └── services/
│   │       ├── powerUpService.js  # Hedera contract interactions
│   │       └── signatureService.js # ECDSA signing
│   └── models/                    # MongoDB schemas
│
├── 📁 frontend/                   # React TypeScript App
│   ├── src/
│   │   ├── components/
│   │   │   ├── Welcome.tsx        # Home + leaderboard
│   │   │   ├── MultiplayerGame.tsx # Game canvas
│   │   │   ├── PowerUps/
│   │   │   │   └── PowerUpDashboard.tsx
│   │   │   ├── MyWins.tsx         # Prize claiming
│   │   │   └── GameHistory.tsx    # Match records
│   │   ├── contracts/
│   │   │   ├── PongPowerUps.ts    # Contract ABIs
│   │   │   └── PongEscrow.ts
│   │   ├── services/              # API clients
│   │   └── hooks/                 # React hooks
│   └── public/
│
└── docker-compose.yml             # Container orchestration
```

---

## 🔌 API Documentation

### 📋 REST API

```
GET    /api/players/top?limit=10            # Leaderboard
GET    /api/players/:address                # Player profile
GET    /api/games/:roomCode                 # Match details
GET    /api/games/player/:address           # Player history
GET    /api/powerups/summary/:address       # Power-up balances
POST   /api/powerups/crate/reveal           # Request crate reveal
GET    /api/powerups/delegations/:address   # Active delegations
```

### 🔗 WebSocket Events (Socket.IO)

**Client → Server:**
```typescript
socket.emit('createRoom', { player, isStaked, stakeAmount })
socket.emit('joinRoom', { roomCode, player })
socket.emit('findRandomMatch', { player })
socket.emit('paddleMove', { position })
socket.emit('activatePowerUp', { powerUpType }, callback)
socket.emit('spectateGame', { roomCode })
socket.emit('getLeaderboard')
socket.emit('getActiveGames')
```

**Server → Client:**
```typescript
socket.on('roomCreated', { roomCode, host, isStaked, stakeAmount })
socket.on('waitingForOpponent', { roomCode })
socket.on('gameStart', { player1, player2, gameState })
socket.on('gameUpdate', { ball, paddles, score, activePowerUps })
socket.on('gameOver', { winner, loser, ratingChanges, finalScore })
socket.on('leaderboardUpdate', { topPlayers })
socket.on('activeGamesList', { games })
socket.on('powerUpActivated', { player, powerUpType, duration })
socket.on('opponentDisconnected')
```

---

## 🌐 Live Deployment

### 🚀 Application
- **Frontend:** Hosted on Vercel
- **Backend API:** `https://.onrender.com`

### ⛓️ Smart Contracts (Hedera Testnet)
- **PongPowerUps:** `0xA1c559E26B3cEB67B79C804FF2321A62A52Fce51`
- **PongEscrow:** `0x4C21eB957191F0dc63AE0b834C9A253f4A205422`
- **Explorer:** https://hashscan.io/testnet

---

## 🛡️ Technologies Used

### ⛓️ Blockchain
- **@hashgraph/sdk** - Official Hedera SDK
- **@hashgraph/hedera-json-rpc-relay** - JSON-RPC interface for Hedera
- **Solidity ^0.8.20** - Smart contracts
- **OpenZeppelin Contracts** - Audited security
- **Hardhat** - Development environment
- **ethers.js** - Contract interactions

### 🎨 Frontend
- **React 18** + **TypeScript**
- **Socket.IO Client** - Real-time communication
- **React Router v6** - Navigation
- **HTML5 Canvas** - Game rendering

### 🔧 Backend
- **Node.js 18** - Runtime
- **Express.js** - REST API
- **Socket.IO 4** - WebSocket server
- **MongoDB** - Database
- **ethers.js** - ECDSA signing

### 🏗️ Infrastructure
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **MongoDB Atlas** - Database
- **Hedera Testnet** - Blockchain network

---

## 🔮 Future Enhancements

### 🎮 Phase 1: Multi-Game Expansion (Q4 2025)
- Air Hockey, Breakout, Memory Match, Quick Reactions
- Unified player profiles across games
- Shared NFT power-ups usable in multiple titles
- Cross-game achievement badges

### 🏆 Phase 2: Tournament System (Q4 2025)
- Bracket management (single/double elimination, round-robin)
- Seasonal leaderboards with monthly resets
- Weekly challenges with special rewards
- Team-based competitions (2v2)
- Tournament broadcasting and spectator modes

### 🌍 Phase 3: Platform Expansion (Q1 2026)
- Mobile native apps (React Native)
- NFT marketplace for power-ups and cosmetics
- Player sponsorship system
- Enhanced analytics dashboard
- Cross-game asset compatibility

### 🚀 Phase 4: Advanced Features (2026+)
- AI training mode with ML opponents
- Professional player coaching system
- Enterprise venue integration
- Metaverse integration
- DAO governance

---

## 📚 Documentation

- **Hedera Docs:** https://docs.hedera.com/
- **Hedera SDK:** https://docs.hedera.com/hedera/sdks-and-apis/sdks
- **JSON-RPC Relay:** https://github.com/hashgraph/hedera-json-rpc-relay
- **Hedera Portal:** https://portal.hedera.com/
- **HashScan Explorer:** https://hashscan.io/testnet

---

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Hedera team for Universal Apps architecture
- OpenZeppelin for audited smart contract libraries
- Atari for the original Pong (1972)
- DoraHacks for hosting Hedera Hackathon

---

## Pitch
- [Demo Video](https://www.canva.com/design/DAG3WJnj02E/Wfk0YeKSX2zyIEih9nLoVQ/view?utm_content=DAG3WJnj02E&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h699a259265)
- [Hedera Certification Link](https://drive.google.com/file/d/1LGp53hkTPfCFQYvI-6-HWA_s2EY_gdzg/view?usp=drivesdk)
