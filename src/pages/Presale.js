import { useState } from 'react';
import { ethers } from 'ethers';

const Presale = () => {
  const [amount, setAmount] = useState('');
  const contractAddress = "0x186eb36aD051f6EB72cb43bd2b0ce621F93a374d";

  const handleBuy = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");
    if (!amount || amount <= 0) return alert("Please enter a valid BNB amount");

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      
      const presaleContract = new ethers.Contract(
        contractAddress,
        ["function buyTokens() public payable"],
        signer
      );

      const tx = await presaleContract.buyTokens({
        value: ethers.utils.parseEther(amount)
      });

      alert("Transaction Sent! Waiting for confirmation...");
      await tx.wait();
      alert("🎉 Success! SOLT Tokens transferred to your wallet.");
    } catch (err) {
      console.error(err);
      alert("Transaction failed! Check console for details.");
    }
  };

  return (
    <div style={{ padding: '40px', color: 'white', textAlign: 'center' }}>
      <div style={{ 
        background: '#1A0533', 
        border: '2px solid #FFD700', 
        borderRadius: '15px', 
        padding: '30px',
        maxWidth: '450px',
        margin: '0 auto',
        boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)'
      }}>
        <h2 style={{ color: '#FFD700', marginBottom: '10px' }}>SOLT Public Sale</h2>
        <p style={{ opacity: 0.8 }}>1 BNB = 20,833 SOLT</p>
        
        <input 
          type="number" 
          placeholder="Amount in BNB" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            margin: '20px 0',
            borderRadius: '8px',
            border: 'none',
            outline: 'none',
            fontSize: '16px'
          }}
        />

        <button 
          onClick={handleBuy}
          style={{
            background: 'linear-gradient(90deg, #FFD700, #FFA500)',
            color: '#1A0533',
            width: '100%',
            padding: '15px',
            borderRadius: '50px',
            border: 'none',
            fontWeight: 'bold',
            fontSize: '18px',
            cursor: 'pointer',
            transition: '0.3s'
          }}
        >
          BUY SOLT NOW
        </button>
      </div>
    </div>
  );
};

export default Presale;