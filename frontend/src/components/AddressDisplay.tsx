import { type FC, useState, useEffect } from 'react';
import { getPlayerByWallet } from '../services/authService';
import '../styles/AddressDisplay.css';
import { useAccount } from 'wagmi';

const AddressDisplay: FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  const { address, isConnected } = useAccount();

  useEffect(() => {
    const fetchUsername = async () => {
      if (!address) {
        setUsername(null);
        return;
      }

      try {
        const player = await getPlayerByWallet(address);
        setUsername(player?.name || null);
      } catch (error) {
        setUsername(null);
      }
    };

    fetchUsername();
  }, [address]);

  if (!isConnected || !username) return null;

  if (!address) return null;

  return (
    <div className="address-display">
      <div className="address-row username-row">
        <span className="username-value">👤 {username}</span>
      </div>
      <div className="address-row">
        <span className="address-label">Address:</span>
        <span className="address-value" title={address}>
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
      </div>
    </div>
  );
};

export default AddressDisplay;

