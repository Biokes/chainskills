// import { createPublicClient, http } from "viem";
// import { sepolia } from "viem/chains";
// // import { ethers } from "ethers";
// import { PONG_ESCROW_ABI } from "@/contracts/PongEscrow";
// import { PONG_POWERUPS_ABI } from "@/contracts/PongPowerUps";

// export const publicClient = createPublicClient({
//   chain: sepolia,
//   transport: http()
// })

// export const jsonRpcProvider = new ethers.JsonRpcProvider("https://testnet.hashio.io/api")
// export const PONG_CONTRACT = new ethers.Contract(import.meta.env.VITE_PONG_ESCROW_ADDRESS, PONG_ESCROW_ABI, jsonRpcProvider);
// export const PONG_POWERUP_CONTRACT = new ethers.Contract(import.meta.env.VITE_PONG_POWERUPS_ADDRESS, PONG_POWERUPS_ABI, jsonRpcProvider)