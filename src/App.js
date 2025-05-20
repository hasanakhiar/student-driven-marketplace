import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SignUp from './components/SignUp';
import Login from './components/Login';

// Main App component with routing
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-16"> {/* Add padding top to account for fixed navbar */}
          <Routes>
            <Route path="/" element={
              <main>
                <Hero />
                {/* Add more homepage components here */}
              </main>
            } />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
