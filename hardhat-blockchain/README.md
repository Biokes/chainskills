# Pong-It Smart Contracts

This directory contains the smart contracts and blockchain infrastructure for Pong-It, built on Hedera.

## 📝 Smart Contracts

### PongEscrow.sol
- Handles match stakes and payouts
- Implements secure winner verification
- Manages refund scenarios
- Uses ECDSA for result validation

### PongPowerUps.sol (ERC-1155)
- NFT power-ups implementation
- Delegation system for rentals
- Daily loot crate mechanics
- Consumption tracking

## 🛠️ Technology Stack

- **Framework**: Hardhat
- **Language**: Solidity ^0.8.20
- **Libraries**: 
  - OpenZeppelin Contracts
  - ethers.js
- **Testing**: Mocha & Chai
- **Deployment**: Hardhat Ignition

## 🚀 Quick Start

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Configure environment:
   ```bash
   cp .env.example .env
   # Add your keys and network settings
   ```

3. Compile contracts:
   ```bash
   pnpm hardhat compile
   ```

4. Run tests:
   ```bash
   pnpm hardhat test
   ```

5. Deploy:
   ```bash
   pnpm hardhat run scripts/deploy-all-ignition.ts --network hedera-testnet
   ```

## 🔧 Development Commands

```bash
# Compile contracts
pnpm hardhat compile

# Run tests
pnpm hardhat test

# Run specific test
pnpm hardhat test test/PongEscrow.ts

# Deploy contracts
pnpm hardhat run scripts/deploy-all-ignition.ts --network hedera-testnet

# Verify on HashScan
- manually verify on the `https://hashscan.io/testnet`

# Generate documentation
pnpm hardhat docgen
```

## 📚 Contract Documentation

### PongEscrow
Manages game stakes and payouts:
```solidity
function stakeAsPlayer1(string calldata roomCode) external payable
function stakeAsPlayer2(string calldata roomCode) external payable
function claimPrize(string calldata roomCode, bytes calldata signature) external
```

### PongPowerUps
ERC-1155 implementation for in-game power-ups:
```solidity
function mintBoost(address to, uint256 id, uint256 amount) external
function delegateBoost(address to, uint256 id, uint256 amount, uint64 expires) external
function consumeBoost(uint256 id, uint256 amount) external
```

## 🔐 Security Considerations

- OpenZeppelin audited contracts
- Reentrancy protection
- Access control implementation
- Signature verification
- Time-locked operations
- Balance validations
