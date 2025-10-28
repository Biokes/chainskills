import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "london",
    },
  },
  networks: {
    hedera: {
      url: "https://testnet.hashio.io/api",
      chainId: 296,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      hedera: "unused",
    },
    customChains: [
      {
        network: "hedera",
        chainId: 296,
        urls: {
          apiURL: "https://server-verify.hashscan.io/api",
          browserURL: "https://hashscan.io/testnet",
        },
      },
    ],
  },
  sourcify: {
    enabled: true ,
  },
};

export default config;
