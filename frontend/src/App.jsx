import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import MarketPrices from './pages/MarketPrices';
import KnowledgeArena from './pages/KnowledgeArena';
import { useAuth } from './context/AuthContext';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we need to open login from URL params (?openLogin=true)
    const params = new URLSearchParams(location.search);
    if (params.get('openLogin') === 'true' && !token) {
      setIsLoginOpen(true);
    }
  }, [location, token]);

  const handleLoginSuccess = () => {
    // If we came from a protected route, redirect back
    const destination = location.state?.from?.pathname || '/';
    if (destination !== '/') {
        navigate(destination);
    }
  };

  return (
    <div className="relative font-sans antialiased">
      <Navbar onOpenLogin={() => setIsLoginOpen(true)} />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home onOpenLogin={() => setIsLoginOpen(true)} />} />
          <Route 
            path="/about" 
            element={
              <ProtectedRoute>
                <AboutUs />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/prices" 
            element={
              <ProtectedRoute>
                <MarketPrices />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/advisory" 
            element={
              <ProtectedRoute>
                <KnowledgeArena />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AnimatePresence>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;
