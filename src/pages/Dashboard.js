import React from 'react';
import { useNavigate } from 'react-router-dom';
import SoltcoinSwap from '../components/SoltcoinSwap';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="home-dashboard" style={{ width: '100%' }}>
      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: 'white', fontSize: '2.5rem', fontWeight: '800' }}>Welcome to SoltDex</h1>
        <p style={{ color: '#8b949e', fontSize: '1.1rem' }}>Trade Soltcoin (SOLT) safely on PancakeSwap</p>
      </div>

      {/* Professional Buy Button / Swap Component */}
      <div style={{ marginBottom: '60px' }}>
        <SoltcoinSwap />
      </div>

      {/* 4 Dashboard Boxes - Synchronized with App.js Routes */}
      <div className="stats-container">
        
        {/* Box 1: View Sales */}
        <div className="stat-card" onClick={() => navigate('/view-sales')} style={{ cursor: 'pointer' }}>
          <div className="stat-label">Launchpad</div>
          <h2>View Sales</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '10px' }}>
            Check out upcoming and live token presales.
          </p>
        </div>

        {/* Box 2: View Token Lockers (Corrected Path) */}
        <div className="stat-card" onClick={() => navigate('/view-token-lockers')} style={{ cursor: 'pointer' }}>
          <div className="stat-label">Security</div>
          <h2>View Token Lockers</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '10px' }}>
            Verify locked team and project tokens.
          </p>
        </div>

        {/* Box 3: View LP Lockers (Corrected Path) */}
        <div className="stat-card" onClick={() => navigate('/view-lp-lockers')} style={{ cursor: 'pointer' }}>
          <div className="stat-label">Liquidity</div>
          <h2>View LP Lockers</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '10px' }}>
            Track locked liquidity for safer investments.
          </p>
        </div>

        {/* Box 4: Leaderboard */}
        <div className="stat-card" onClick={() => navigate('/leaderboard')} style={{ cursor: 'pointer' }}>
          <div className="stat-label">Ranking</div>
          <h2>Leaderboard</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '10px' }}>
            See the top performing projects on SoltDex.
          </p>
        </div>

      </div>

      {/* Hero CTA Paragraph (Jaisa image mein tha) */}
      <div className="hero-cta-paragraph" style={{ marginTop: '80px' }}>
        <h1>Secure & <span>Community-Driven</span> Crypto Asset</h1>
        <p>SOLT is built with a fixed total supply of 50,000,000, ensuring transparency and security.</p>
        <button className="buy-token-btn" style={{ marginTop: '20px' }} onClick={() => navigate('/create')}>
          START BUILDING
        </button>
      </div>

    </div>
  );
};

export default Dashboard;