import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SoltcoinSwap from '../components/SoltcoinSwap';
import { supabase } from '../supabaseClient'; // Supabase client import karo

const Dashboard = ({ userAddress }) => { // userAddress props se lo ya localstorage se
  const navigate = useNavigate();
  const [referralLogs, setReferralLogs] = useState([]);
  const [copyText, setCopyText] = useState("Copy Link");

  // 1. Database se History Fetch karna
  useEffect(() => {
    const fetchHistory = async () => {
      if (!userAddress) return;
      const { data, error } = await supabase
        .from('refill_logs')
        .select('*')
        .eq('user_address', userAddress)
        .order('created_at', { ascending: false });

      if (!error) setReferralLogs(data);
    };
    fetchHistory();
  }, [userAddress]);

  // 2. Referral Link Copy Function
  const handleCopy = () => {
    const link = `https://soltdex-frontend.vercel.app/dashboard?ref=${userAddress}`;
    navigator.clipboard.writeText(link);
    setCopyText("Copied! ✅");
    setTimeout(() => setCopyText("Copy Link"), 2000);
  };

  return (
    <div className="home-dashboard" style={{ width: '100%' }}>
      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: 'white', fontSize: '2.5rem', fontWeight: '800' }}>Welcome to SoltDex</h1>
        <p style={{ color: '#8b949e', fontSize: '1.1rem' }}>Trade Soltcoin (SOLT) safely on PancakeSwap</p>
      </div>

      {/* --- NEW: REFERRAL SECTION START --- */}
      <div style={{ 
        background: 'linear-gradient(145deg, #1e1e3f, #11112b)', 
        padding: '25px', 
        borderRadius: '15px', 
        border: '1px solid #ffd700', 
        marginBottom: '40px',
        textAlign: 'center' 
      }}>
        <h2 style={{ color: '#ffd700', marginBottom: '10px' }}>📢 Earn 5% Referral Rewards</h2>
        <p style={{ color: '#ccc', marginBottom: '20px' }}>Invite friends and get SOLT tokens instantly on their purchase.</p>
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <input 
            readOnly 
            value={userAddress ? `https://soltdex-frontend.vercel.app/?ref=${userAddress.substring(0,8)}...` : "Connect Wallet to get link"} 
            style={{ 
              background: '#0d1117', border: '1px solid #30363d', color: '#fff', 
              padding: '10px 15px', borderRadius: '8px', width: '300px' 
            }}
          />
          <button 
            onClick={handleCopy}
            disabled={!userAddress}
            style={{ 
              background: '#ffd700', color: '#000', fontWeight: 'bold', 
              padding: '10px 25px', borderRadius: '8px', cursor: 'pointer', border: 'none' 
            }}
          >
            {copyText}
          </button>
        </div>

        {/* Payout History Table */}
        <div style={{ marginTop: '30px', overflowX: 'auto' }}>
          <h4 style={{ color: '#8b949e', textAlign: 'left', marginBottom: '10px' }}>Your Payout History</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #30363d', color: '#8b949e' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Amount</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {referralLogs.length > 0 ? referralLogs.map((log, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #21262d' }}>
                  <td style={{ padding: '10px' }}>{log.amount} SOLT</td>
                  <td style={{ padding: '10px', color: log.status === 'completed' ? '#238636' : '#d29922' }}>
                    {log.status === 'completed' ? '✅ Paid' : '⏳ Pending'}
                  </td>
                  <td style={{ padding: '10px', fontSize: '0.8rem', color: '#8b949e' }}>
                    {new Date(log.created_at).toLocaleDateString()}
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="3" style={{ padding: '20px', color: '#8b949e' }}>No referral payouts found yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* --- REFERRAL SECTION END --- */}

      {/* Professional Buy Button / Swap Component */}
      <div style={{ marginBottom: '60px' }}>
        <SoltcoinSwap />
      </div>

      {/* 4 Dashboard Boxes */}
      <div className="stats-container">
        <div className="stat-card" onClick={() => navigate('/view-sales')} style={{ cursor: 'pointer' }}>
          <div className="stat-label">Launchpad</div>
          <h2>View Sales</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '10px' }}>Check out upcoming and live token presales.</p>
        </div>

        <div className="stat-card" onClick={() => navigate('/view-token-lockers')} style={{ cursor: 'pointer' }}>
          <div className="stat-label">Security</div>
          <h2>View Token Lockers</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '10px' }}>Verify locked team and project tokens.</p>
        </div>

        <div className="stat-card" onClick={() => navigate('/view-lp-lockers')} style={{ cursor: 'pointer' }}>
          <div className="stat-label">Liquidity</div>
          <h2>View LP Lockers</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '10px' }}>Track locked liquidity for safer investments.</p>
        </div>

        <div className="stat-card" onClick={() => navigate('/leaderboard')} style={{ cursor: 'pointer' }}>
          <div className="stat-label">Ranking</div>
          <h2>Leaderboard</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '10px' }}>See the top performing projects on SoltDex.</p>
        </div>
      </div>

      {/* Hero CTA Paragraph */}
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