export const STORAGE_KEY = 'pong_username'

export const INITIAL_BALL_SPEED = 31
export const PADDLE_SPEED = 0.01
export const INITIAL_RATING = 1000

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const PONG_ESCROW_ADDRESS = import.meta.env.VITE_PONG_ESCROW_ADDRESS as `0x${string}`
export const PONG_POWERUPS_ADDRESS = import.meta.env.VITE_PONG_POWERUPS_ADDRESS as `0x${string}`

export const POWER_UP_METADATA = {
  1: {
    id: 1,
    key: 'speed',
    name: 'Speed Surge',
    description: 'Temporary paddle acceleration for clutch saves',
    icon: '⚡'
  },
  2: {
    id: 2,
    key: 'shield',
    name: 'Guardian Shield',
    description: 'Summons an energy barrier that blocks one goal',
    icon: '🛡️'
  },
  3: {
    id: 3,
    key: 'multiball',
    name: 'Multiball Mayhem',
    description: 'Splits the ball for a burst of chaotic offense',
    icon: '💥'
  }
} as const

export const POWER_UP_IDS = Object.keys(POWER_UP_METADATA).map(Number)

export const STAKE_AMOUNTS = [
  { value: '0.1', label: '0.1 HBAR' },
  { value: '0.5', label: '0.5 HBAR' },
  { value: '1', label: '1 HBAR' },
  { value: '5', label: '5 HBAR' },
]

export const MatchStatus = {
  NOT_CREATED: 0,
  PLAYER1_STAKED: 1,
  BOTH_STAKED: 2,
  COMPLETED: 3,
  REFUNDED: 4,
} as const

export const HEDERA_TESTNET_EXPLORER = 'https://hashscan.io/testnet/'
