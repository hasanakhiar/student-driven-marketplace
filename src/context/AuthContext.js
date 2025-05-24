import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Set auth token
  const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  };

  // Load user
  const loadUser = async () => {
    if (token) {
      try {
        const res = await axios.get('/auth/me');
        setUser(res.data.user);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || 'Error loading user');
        logout();
      }
    }
    setLoading(false);
  };

  // Register user
  const register = async (userData) => {
    try {
      const res = await axios.post('/auth/register', userData);
      setToken(res.data.token);
      setUser(res.data.user);
      setAuthToken(res.data.token);
      setError(null);
      navigate('/dashboard');
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const res = await axios.post('/auth/login', { email, password });
      setToken(res.data.token);
      setUser(res.data.user);
      setAuthToken(res.data.token);
      setError(null);
      navigate('/dashboard');
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Logout user
  const logout = () => {
    setToken(null);
    setUser(null);
    setAuthToken(null);
    navigate('/');
  };

  // Update profile
  const updateProfile = async (profileData) => {
    try {
      const res = await axios.put('/users/profile', profileData);
      setUser(res.data.user);
      setError(null);
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Profile update failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Update password
  const updatePassword = async (currentPassword, newPassword) => {
    try {
      await axios.put('/users/password', { currentPassword, newPassword });
      setError(null);
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Password update failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Delete account
  const deleteAccount = async () => {
    try {
      await axios.delete('/users');
      logout();
      setError(null);
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Account deletion failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  useEffect(() => {
    loadUser();
  }, [token]);

  const value = {
    user,
    token,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile,
    updatePassword,
    deleteAccount
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 