import React, { useState } from 'react';
import { ethers } from 'ethers';

const Presale = () => {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const contractAddress = "0x186eb36aD051f6EB72cb43bd2b0ce621F93a374d";

  const handleBuy = async () => {
    try {
      setStatus("Processing...");
      if (!window.ethereum) throw new Error("MetaMask not found!");

      // ✅ ethers v6 syntax (BrowserProvider)
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Simple ABI for the function
      const abi = ["function buyTokens() payable"];
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // ✅ ethers v6 syntax (parseEther directly under ethers)
      const tx = await contract.buyTokens({
        value: ethers.parseEther(amount)
      });

      setStatus("Transaction Sent! Waiting for confirmation...");
      await tx.wait();
      setStatus("Success! Tokens Bought.");
      alert("Tokens successfully purchased!");
    } catch (err) {
      console.error("Presale Error:", err);
      setStatus("Error: " + err.message);
      alert("Error: " + err.message);
    }
  };

  return (
    <div style={{ 
      padding: '100px 20px', 
      textAlign: 'center', 
      color: 'white', 
      minHeight: '80vh' 
    }}>
      <h2 style={{ color: '#f59e0b' }}>SOLT PUBLIC SALE</h2>
      <p style={{ marginBottom: '20px' }}>Enter BNB amount to buy SOLT</p>
      
      <input
        type="number"
        placeholder="Amount in BNB"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: '10px', borderRadius: '5px', border: 'none', width: '250px' }}
      />
      
      <button 
        onClick={handleBuy}
        style={{ 
          marginLeft: '10px', 
          padding: '10px 25px', 
          background: '#f59e0b', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        BUY NOW
      </button>

      {status && <p style={{ marginTop: '20px', color: '#f59e0b' }}>{status}</p>}
    </div>
  );
};

export default Presale;