import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onLoginClick }) => {
  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-indigo-600">Motiner Dokan</span>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-6">
            {/* Language Selector */}
            <div className="relative">
              <select
                className="appearance-none bg-transparent text-gray-600 hover:text-gray-900 transition-colors pr-8 focus:outline-none cursor-pointer"
                defaultValue="en"
              >
                <option value="en">English</option>
                <option value="bn">বাংলা</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={onLoginClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
