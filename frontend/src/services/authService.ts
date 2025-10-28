import { BACKEND_URL } from '../constants';

export interface Player {
  _id: string;
  walletAddress: string;
  name: string;
  rating: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  lastActive: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  player: Player;
  isNewPlayer: boolean;
}

export interface AuthError {
  error: string;
  needsUsername?: boolean;
  usernameTaken?: boolean;
}


export async function authenticatePlayer(
  walletAddress: string,
  name?: string
): Promise<AuthResponse> {
  const normalizedAddress = walletAddress.toLowerCase().trim();

  try {
    const response = await fetch(`${BACKEND_URL}/players/by-wallet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        walletAddress: normalizedAddress,
        name: name?.trim(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 404 && data.needsUsername) {
        throw new Error('USERNAME_REQUIRED');
      }
      if (response.status === 409 && data.usernameTaken) {
        throw new Error('USERNAME_TAKEN');
      }
      
      throw new Error(data.error || 'Authentication failed');
    }


    return data as AuthResponse;
  } catch (error) {
    throw error;
  }
}

export async function getPlayerByWallet(
  walletAddress: string
): Promise<Player | null> {
  const normalizedAddress = walletAddress.toLowerCase().trim();

  try {
    const response = await fetch(
      `${BACKEND_URL}/players/by-wallet/${normalizedAddress}`
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error('Failed to fetch player');
    }

    const player = await response.json();
    return player as Player;
  } catch (error) {
    return null;
  }
}

export async function updatePlayerName(
  walletAddress: string,
  newName: string
): Promise<Player> {
  const normalizedAddress = walletAddress.toLowerCase().trim();

  try {
    const response = await fetch(`${BACKEND_URL}/players/by-wallet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        walletAddress: normalizedAddress,
        name: newName.trim(),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to update name');
    }

    return data.player as Player;
  } catch (error) {
    throw error;
  }
}

