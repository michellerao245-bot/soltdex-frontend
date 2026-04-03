import React, { useState } from 'react';          
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';          
         
// Layout Components          
import Sidebar from './components/Sidebar';          
import ConnectWallet from './components/ConnectWallet';     
// Note: MarketNav ab yahan se hata kar Home.js mein use karenge (niche instruction dekho)

// Pages          
import Home from './pages/Home';          
import Dashboard from './pages/Dashboard';    
import ViewSales from './pages/ViewSales';    
import ViewTokenLockers from './pages/ViewTokenLockers';    
import ViewLPLockers from './pages/ViewLPLockers';    
import Leaderboard from './pages/Leaderboard';    
import Soltswap from './pages/Soltswap';   
import Create from './pages/Create';       
import CreateToken from './pages/CreateToken';       
import CreateSale from './pages/CreateSale';       
import CreateLock from './pages/CreateLock';       
  
// Pages import
import ScamDetection from './pages/ScamDetection';   
import WhaleTracking from './pages/WhaleTracking';   
import SnipingSignals from './pages/SnipingSignals';   
import MarketsPage from './pages/MarketsPage';   
import Presale from './pages/Presale';         
import './App.css';          
         
function App() {          
  const [isOpen, setIsOpen] = useState(true);          
  const toggleSidebar = () => setIsOpen(!isOpen);          
         
  const sidebarWidth = isOpen ? '260px' : '80px';     
    
  return (          
    <Router>          
      <div className="app-layout">          
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />          
                  
        <main          
          className="main-area"          
          style={{          
            marginLeft: sidebarWidth,          
            transition: 'all 0.3s ease',         
            width: `calc(100% - ${sidebarWidth})`,     
            display: 'flex',       
            flexDirection: 'column',       
            minHeight: '100vh',    
            overflowX: 'hidden'     
          }}         
        >          
          <header className="nav-container">            
            <div className="nav-right">       
              <ConnectWallet />       
            </div>       
          </header>            
            
          {/* ✅ content-wrapper ensures footer stays at bottom */}
          <div className="content-wrapper"> 
               
            <div className="main-content">            
              <Routes>            
                <Route path="/" element={<Home />} />            
                <Route path="/dashboard" element={<Dashboard />} />      
                <Route path="/view-sales" element={<ViewSales />} />      
                <Route path="/view-token-lockers" element={<ViewTokenLockers />} />      
                <Route path="/view-lp-lockers" element={<ViewLPLockers />} />      
                <Route path="/leaderboard" element={<Leaderboard />} />      
                <Route path="/scam-detection" element={<ScamDetection />} />    
                <Route path="/whale-tracking" element={<WhaleTracking />} />    
                <Route path="/token-analytics" element={<WhaleTracking />} />    
                <Route path="/sniping-signals" element={<SnipingSignals />} />    
                <Route path="/markets" element={<MarketsPage />} />    
                <Route path="/presale" element={<Presale />} />    
                <Route path="/soltswap" element={<Soltswap />} />      
                <Route path="/create" element={<Create />} />          
                <Route path="/create-tokens" element={<CreateToken />} />          
                <Route path="/create-sales" element={<CreateSale />} />          
                <Route path="/create-locks" element={<CreateLock />} />          
              </Routes>            
            </div>  
               
            {/* ✅ MarketNav yahan se hata diya gaya hai taaki har page par na dikhe */}
     
            <footer className="site-footer">         
              <div className="footer-content">         
                <div className="footer-column">         
                  <h4>Products</h4>         
                  <ul>         
                    <li><a href="/soltswap">Soltswap</a></li>         
                    <li><a href="/scam-detection">SoltGuardian (AI)</a></li>         
                    <li><a href="/whale-tracking">Whale Watch</a></li>         
                    <li><a href="/create-locks">SoltLock</a></li>         
                    <li><a href="/create-tokens">SoltMint</a></li>         
                  </ul>         
                </div>         
                <div className="footer-column">         
                  <h4>Company</h4>         
                  <ul>         
                    <li><a href="#story">Our Story</a></li>         
                    <li><a href="#terms">Terms of Use</a></li>         
                    <li><a href="#privacy">Private Policy</a></li>         
                  </ul>         
                </div>         
                <div className="footer-column">         
                  <h4>Resources</h4>         
                  <ul>         
                    <li><a href="#docs">Documentation</a></li>         
                    <li><a href="#support">Support Chat</a></li>         
                    <li><a href="#marketing">Marketing</a></li>         
                  </ul>         
                </div>         
              </div>         
              <div className="footer-bottom">         
                <p>© 2026 Soltchain Technologies</p>         
              </div>         
            </footer>         
          </div>  
        </main>          
      </div>          
    </Router>          
  );          
}          
         
export default App;