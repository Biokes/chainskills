import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Welcome from './components/Welcome'
import MultiplayerGame from './components/MultiplayerGame'
import SpectatorView from './components/SpectatorView'
import GameOver from './components/GameOver'
import MyWins from './components/MyWins'
import GameHistory from './components/GameHistory'
import UnclaimedStakes from './components/UnclaimedStakes'
import PowerUpDashboard from './components/PowerUps/PowerUpDashboard'
import SpeakerIcon from './components/SpeakerIcon'
import './styles/App.css'
import { authenticatePlayer, type Player as AuthPlayer } from './services/authService'
import { useAccount } from 'wagmi';
import LandingPage from './components/landingPage'

interface Player {
  name: string
  rating: number
}

interface GameState {
  player1: Player | null
  player2: Player | null
  gameMode: string | null
}

function App() {
  const { address, isConnected } = useAccount()

  const [gameState, setGameState] = useState<GameState>({
    player1: null,
    player2: null,
    gameMode: null,
  })

  const [username, setUsername] = useState<string | null>(null)
  const [authenticatedPlayer, setAuthenticatedPlayer] = useState<AuthPlayer | null>(null)
  const [isAuthenticating, setIsAuthenticating] = useState(false)


  useEffect(() => {
    const authenticate = async () => {
      if (!isConnected || !address) {
        setAuthenticatedPlayer(null)
        setUsername(null)
        return
      }

      setIsAuthenticating(!isAuthenticating)

      try {
        const result = await authenticatePlayer(address)
        setAuthenticatedPlayer(result.player)
        setUsername(result.player.name)


      } catch (error: any) {
        if (error.message === 'USERNAME_REQUIRED') {
          setAuthenticatedPlayer(null)
          setUsername(null)
        } else {
          setAuthenticatedPlayer(null)
          setUsername(null)
        }
      } finally {
        setIsAuthenticating(!isAuthenticating)
      }
    }
    authenticate()
  }, [isConnected, address])

  const handleUsernameSet = async (newUsername: string, walletAddr?: string) => {
    const addressToUse = walletAddr || address

    if (!addressToUse) {
      throw new Error('No wallet connected')
    }

    try {
      const result = await authenticatePlayer(addressToUse, newUsername)

      setAuthenticatedPlayer(result.player)
      setUsername(result.player.name)

      setGameState(prev => ({
        ...prev,
        player1: {
          name: result.player.name,
          rating: result.player.rating
        }
      }))

      return result.player
    } catch (error: any) {

      if (error.message === 'USERNAME_TAKEN') {
        throw new Error('USERNAME_TAKEN')
      }
      throw error
    }
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <div>
          <Route path="/pong"
            element={<Welcome
              setGameState={setGameState}
              savedUsername={username}
              onUsernameSet={handleUsernameSet}
              authenticatedPlayer={authenticatedPlayer}
              walletAddress={address as string}
            />
            }
          />
          <Route
            path="/game"
            element={
              <MultiplayerGame
                username={username}
                walletAddress={address as string}
                authenticatedPlayer={authenticatedPlayer}
              />
            }
          />
          <Route
            path="/spectate"
            element={<SpectatorView />}
          />
          <Route
            path="/game-over"
            element={
              <GameOver
              // savedUsername={username}
              // walletAddress={address}
              // authenticatedPlayer={authenticatedPlayer}
              // onPlayAgain={() => {
              //   setGameState(prev => ({
              //     ...prev,
              //     player1: {
              //       name: username || 'Guest',
              //       rating: authenticatedPlayer?.rating || 800
              //     }
              //   }))
              // }}
              />
            }
          />
          <Route
            path="/my-wins"
            element={<MyWins />}
          />
          <Route
            path="/game-history"
            element={<GameHistory savedUsername={username} />}
          />
          <Route
            path="/unclaimed-stakes"
            element={<UnclaimedStakes />}
          />
          <Route
            path="/powerups"
            element={<PowerUpDashboard walletAddress={address as string} />}
          />
          <SpeakerIcon />
        </div>
      </Routes>
    </div>
  )
}

export default App
