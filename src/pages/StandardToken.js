import React, { useState } from 'react';
import { ethers } from 'ethers';

const StandardToken = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    symbol: '', 
    supply: '', 
    decimals: '18' 
  });

  const handleDeploy = async () => {
    // Basic Validation
    if (!formData.name || !formData.symbol || !formData.supply) {
      return alert("Bhai, saari details fill kijiye!");
    }

    try {
      if (!window.ethereum) {
        return alert("MetaMask connect kijiye!");
      }

      setLoading(true);

      // 1. Right side wale connected wallet ko hi use karna
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      console.log("Using Wallet:", accounts[0]);

      // 2. Forcefully BSC Mainnet (Chain ID 56) par switch karwana
      const bscChainId = "0x38"; // 56 in hex
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: bscChainId }],
        });
      } catch (switchError) {
        // Agar network add nahi hai toh add karne ka popup
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: bscChainId,
              chainName: 'Binance Smart Chain Mainnet',
              nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
              rpcUrls: ['https://bsc-dataseed.binance.org/'],
              blockExplorerUrls: ['https://bscscan.com/'],
            }],
          });
        }
      }

      // 3. 0.2 BNB Transaction (Right wallet se popup aayega)
      const feeAmount = ethers.parseEther("0.2");

      const tx = await signer.sendTransaction({
        to: "0xC30050aBe984c3B3929822E3BbF33fbBE6b3C423", // Aapka Fee Address
        value: feeAmount,
      });

      console.log("Transaction Hash:", tx.hash);
      await tx.wait();

      alert("🎉 Payment Successful! Your token is being deployed.");

    } catch (err) {
      console.error("Detailed Error:", err);
      // Detailed alert messages
      if (err.code === "ACTION_REJECTED") {
        alert("Bhai, aapne transaction MetaMask se reject kar di!");
      } else if (err.code === "INSUFFICIENT_FUNDS") {
        alert("Wallet mein 0.2 BNB balance nahi hai!");
      } else {
        alert("Error: " + (err.reason || "Transaction failed. Console check karein."));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Mint Standard Token</h2>
        <p style={subtitleStyle}>Service Fee: 0.2 BNB (~₹10,000)</p>

        <div style={formStyle}>
          <div style={inputGroup}>
            <label style={labelStyle}>Token Name*</label>
            <input 
              placeholder="Ex: Solt Token" 
              style={inputStyle}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Symbol*</label>
            <input 
              placeholder="Ex: SOLT" 
              style={inputStyle}
              onChange={(e) => setFormData({...formData, symbol: e.target.value})}
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Total Supply*</label>
            <input 
              type="number" 
              placeholder="Ex: 1000000000" 
              style={inputStyle}
              onChange={(e) => setFormData({...formData, supply: e.target.value})}
            />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>Decimals</label>
            <input 
              type="number" 
              value={formData.decimals}
              style={inputStyle}
              onChange={(e) => setFormData({...formData, decimals: e.target.value})}
            />
          </div>

          <button 
            onClick={handleDeploy}
            disabled={loading}
            style={loading ? btnDisabledStyle : btnStyle}
          >
            {loading ? "Waiting for MetaMask..." : "Pay 0.2 BNB & Deploy"}
          </button>
        </div>
      </div>
    </div>
  );
};

// CSS styles remain same (dark theme)
const containerStyle = { padding: '40px 20px', display: 'flex', justifyContent: 'center', minHeight: '100vh' };
const cardStyle = { background: '#1a1f2e', padding: '30px', borderRadius: '15px', width: '100%', maxWidth: '450px', border: '1px solid #2d3748', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' };
const titleStyle = { color: '#f3ba2f', marginBottom: '5px', textAlign: 'center', fontSize: '24px' };
const subtitleStyle = { color: '#a0aec0', fontSize: '14px', textAlign: 'center', marginBottom: '25px' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '18px' };
const inputGroup = { display: 'flex', flexDirection: 'column', gap: '8px' };
const labelStyle = { color: '#e2e8f0', fontSize: '13px', fontWeight: 'bold' };
const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #2d3748', background: '#0f172a', color: 'white', outline: 'none' };
const btnStyle = { padding: '16px', background: '#3182ce', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', marginTop: '10px' };
const btnDisabledStyle = { ...btnStyle, background: '#4a5568', cursor: 'not-allowed' };

export default StandardToken;