import React, { useState, useEffect } from 'react';

const ConnectWallet = () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) setAccount(accounts[0]);
      }
    };
    checkConnection();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User rejected connection");
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <button className="connect-wallet-btn" onClick={connectWallet}>
      {account 
        ? `${account.substring(0, 6)}...${account.substring(38)}` 
        : "Connect Wallet"}
    </button>
  );
};

export default ConnectWallet;