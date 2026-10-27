import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('techcart_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('techcart_token') || null);
  const [loading, setLoading] = useState(true);

  // Sync / verify profile if token exists on load
  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          const data = await authService.getProfile();
          if (data?.user) {
            setUser(data.user);
            localStorage.setItem('techcart_user', JSON.stringify(data.user));
          }
        } catch (err) {
          console.warn('Session expired or invalid token:', err.message);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [token]);

  const login = async (email, password) => {
    const data = await authService.login({ email, password });
    if (data.token) {
      localStorage.setItem('techcart_token', data.token);
      localStorage.setItem('techcart_user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  const register = async (name, email, password, confirmPassword) => {
    const data = await authService.register({ name, email, password, confirmPassword });
    if (data.token) {
      localStorage.setItem('techcart_token', data.token);
      localStorage.setItem('techcart_user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  const updateProfile = async (profileData) => {
    const data = await authService.updateProfile(profileData);
    if (data.user) {
      setUser(data.user);
      localStorage.setItem('techcart_user', JSON.stringify(data.user));
    }
    if (data.token) {
      localStorage.setItem('techcart_token', data.token);
      setToken(data.token);
    }
    return data;
  };

  const logout = () => {
    localStorage.removeItem('techcart_token');
    localStorage.removeItem('techcart_user');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isAdmin: user?.role === 'admin',
    loading,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
