import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateToken.css';

const SoltMint = () => {
  const navigate = useNavigate();
  return (
    <div className="mint-container fade-in">
      <h1 className="mint-title">Solt<span className="blue-text">Mint</span> - Token Creator</h1>
      <div className="mint-section">
        <h3>Choose your token technology</h3>
        <div className="type-list">
          <div className="type-card" onClick={() => navigate('/standard-token')}>
            <span>Standard Token</span><button className="select-btn">Select</button>
          </div>
          <div className="type-card" onClick={() => navigate('/burn-token')}>
            <span>Burn Token</span><button className="select-btn">Select</button>
          </div>
          <div className="type-card" onClick={() => navigate('/fee-token')}>
            <span>Fee Token</span><button className="select-btn">Select</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SoltMint;