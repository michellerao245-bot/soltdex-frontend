import React, { useState } from 'react';
import { ethers } from 'ethers'; // v6 version
import './CreateToken.css';

const BurnToken = () => {
  const [loading, setLoading] = useState(false);

  const deployBurnToken = async () => {
    try {
      if (!window.ethereum) return alert("MetaMask Connect Karein!");
      setLoading(true);

      // Ethers v6 Syntax
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // --- PAYMENT (0.2 BNB) ---
      const tx = await signer.sendTransaction({
        to: "YOUR_WALLET_ADDRESS_HERE", 
        value: ethers.parseUnits("0.2", "ether") // v6 style
      });

      console.log("Transaction sent:", tx.hash);
      await tx.wait(); 
      alert("₹10,000 Received! Processing Burn Token...");

    } catch (err) {
      console.error(err);
      alert("Error: " + (err.reason || "Transaction Failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mint-container fade-in">
      <h1 className="mint-title">Deploy <span style={{color: '#ef4444'}}>Burn Token</span></h1>
      <div className="mint-section">
        <div className="section-header">
          <span className="step-badge">🔥</span>
          <h3>Burn Settings (Fee: 0.2 BNB)</h3>
        </div>
        <div className="form-grid">
          <div className="input-group"><label>Name</label><input type="text" placeholder="Ex: Solt Burn" /></div>
          <div className="input-group"><label>Symbol</label><input type="text" placeholder="BURN" /></div>
          <div className="input-group"><label>Supply</label><input type="number" placeholder="1000000" /></div>
          <div className="input-group"><label>Burn %</label><input type="number" placeholder="2" /></div>
        </div>
        <button className="mint-submit-btn" style={{background: '#ef4444'}} onClick={deployBurnToken} disabled={loading}>
          {loading ? "Processing..." : "Pay ₹10,000 & Deploy"}
        </button>
      </div>
    </div>
  );
};

export default BurnToken;