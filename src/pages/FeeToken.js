import React, { useState } from 'react';
import { ethers } from 'ethers';
import './CreateToken.css';

const FeeToken = () => {
  const [loading, setLoading] = useState(false);

  const deployFeeToken = async () => {
    try {
      if (!window.ethereum) return alert("MetaMask Connect Karein!");
      setLoading(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: "YOUR_WALLET_ADDRESS_HERE",
        value: ethers.parseUnits("0.2", "ether")
      });

      await tx.wait();
      alert("Payment Received! Deploying Fee Token...");

    } catch (err) {
      alert("Payment Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mint-container fade-in">
      <h1 className="mint-title">Deploy <span className="blue-text">Fee Token</span></h1>
      <div className="mint-section">
        {/* Same UI as before */}
        <button className="mint-submit-btn" onClick={deployFeeToken} disabled={loading}>
          {loading ? "Processing..." : "Pay ₹10,000 & Deploy"}
        </button>
      </div>
    </div>
  );
};

export default FeeToken;