
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ModelsPage from './pages/ModelsPage';
import ClubsPage from './pages/ClubsPage';
import ContactPage from './pages/ContactPage';
import AgencyPage from './pages/AgencyPage';
import Dashboard from './pages/Dashboard';
import { AdminProvider } from './context/AdminContext';

const ShortcutHandler: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Atalho: Alt + Shift + A para o Dashboard
      if (e.altKey && e.shiftKey && e.key.toUpperCase() === 'A') {
        navigate('/dashboard');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return null;
};

const App: React.FC = () => {
  return (
    <AdminProvider>
      <Router>
        <ShortcutHandler />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow bg-black">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/agencia" element={<AgencyPage />} />
              <Route path="/modelos" element={<ModelsPage />} />
              <Route path="/boates" element={<ClubsPage />} />
              <Route path="/contato" element={<ContactPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AdminProvider>
  );
};

export default App;
