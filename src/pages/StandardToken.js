import React, { useState } from 'react';
import { ethers } from 'ethers'; // v6 connectivity
import './CreateToken.css';

const StandardToken = () => {
  const [loading, setLoading] = useState(false);

  const handleDeploy = async () => {
    try {
      if (!window.ethereum) return alert("MetaMask install karo bhai!");
      
      setLoading(true);
      // Ethers v6 ka naya tarika
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // --- YE HAI AAPKI INCOME KA LOGIC (₹10,000) ---
      const tx = await signer.sendTransaction({
        to: "YOUR_WALLET_ADDRESS_HERE", // <-- Yahan apna asli BSC address daalo
        value: ethers.parseEther("0.2") 
      });

      console.log("Payment Successful, waiting for confirmation...");
      await tx.wait(); 

      alert("Payment Mil Gayi! Ab aapka Token Deploy ho raha hai...");
      
    } catch (err) {
      console.error(err);
      alert("Payment Fail ya Cancel ho gayi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mint-container">
      <div className="mint-section">
        <h3>🚀 Standard Token (Fee: 0.2 BNB / ₹10,000)</h3>
        {/* Form Inputs yahan add kar sakte hain */}
        <div className="form-grid" style={{marginBottom: '20px'}}>
           <div className="input-group"><label>Token Name</label><input type="text" placeholder="Ex: Solt Token" /></div>
           <div className="input-group"><label>Symbol</label><input type="text" placeholder="SOLT" /></div>
        </div>
        
        <button 
          className="mint-submit-btn" 
          onClick={handleDeploy}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay ₹10,000 & Deploy Token"}
        </button>
      </div>
    </div>
  );
};

export default StandardToken;