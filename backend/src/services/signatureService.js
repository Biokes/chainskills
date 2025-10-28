const { ethers } = require('ethers');

class SignatureService {
  constructor() {
    this.wallet = null;
    this.initializeWallet();
  }

  initializeWallet() {
    const privateKey = process.env.SIGNING_WALLET_PRIVATE_KEY;

    if (!privateKey || privateKey === 'YOUR_PRIVATE_KEY_HERE') {
      console.error('⚠️  SIGNING_WALLET_PRIVATE_KEY not configured in .env');
      console.error('⚠️  Signature generation will be disabled');
      return;
    }

    try {
      this.wallet = new ethers.Wallet(privateKey);
      console.log('✅ Signature service initialized');
      console.log('📝 Signer address:', this.wallet.address);
    } catch (error) {
      console.error('❌ Failed to initialize signing wallet:', error.message);
    }
  }

  async signWinner(roomCode, winnerAddress, stakeAmount) {
    if (!this.wallet) {
      throw new Error('Signing wallet not initialized. Check SIGNING_WALLET_PRIVATE_KEY in .env');
    }

    try {

      const messageHash = ethers.solidityPackedKeccak256(
        ['string', 'address'],
        [roomCode, winnerAddress]
      );

      const signature = await this.wallet.signMessage(ethers.getBytes(messageHash));

      console.log('✅ Winner signature generated:', {
        roomCode,
        winner: winnerAddress,
        stakeAmount,
        messageHash,
        signaturePreview: signature.slice(0, 10) + '...',
        signerAddress: this.wallet.address
      });

      return signature;
    } catch (error) {
      console.error('❌ Failed to sign winner proof:', error);
      throw error;
    }
  }
  
  async signAbandonedRefund(roomCode, player1Address) {
    if (!this.wallet) {
      throw new Error('Signing wallet not initialized. Check SIGNING_WALLET_PRIVATE_KEY in .env');
    }

    try {
      const messageHash = ethers.solidityPackedKeccak256(
        ['string', 'address', 'string'],
        [roomCode, player1Address, 'ABANDONED']
      );

      const signature = await this.wallet.signMessage(ethers.getBytes(messageHash));

      console.log('✅ Abandoned refund signature generated:', {
        roomCode,
        player1: player1Address,
        messageHash,
        signaturePreview: signature.slice(0, 10) + '...',
        signerAddress: this.wallet.address
      });

      return signature;
    } catch (error) {
      console.error('❌ Failed to sign abandoned refund:', error);
      throw error;
    }
  }

  getSignerAddress() {
    return this.wallet ? this.wallet.address : null;
  }

  isReady() {
    return this.wallet !== null;
  }
}

module.exports = new SignatureService();


