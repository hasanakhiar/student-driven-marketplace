import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchSection from './components/SearchSection';
import ListingGrid from './components/ListingGrid';
import ListingDetail from './components/ListingDetail';
import LoginModal from './components/LoginModal';
import ListingsPage from './components/ListingsPage';

// Wrapper component to handle location state
const AppContent = () => {
  const location = useLocation();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onLoginClick={() => setIsLoginModalOpen(true)} />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      
      <Routes>
        <Route path="/" element={<SearchSection />} />
        <Route path="/listings" element={<ListingsPage initialFilters={location.state?.filters || {}} />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
      </Routes>
    </div>
  );
};

// Main App component with routing
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
