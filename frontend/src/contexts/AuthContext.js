import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInWithGoogle, getUserInfo, revokeToken } from '../services/googleAuth';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Load Google API script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Check for existing token in localStorage
    const savedToken = localStorage.getItem('google_access_token');
    const savedUser = localStorage.getItem('user_info');
    
    if (savedToken && savedUser) {
      setAccessToken(savedToken);
      setUser(JSON.parse(savedUser));
      // Set up axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
    }
    
    setLoading(false);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const login = async () => {
    try {
      setLoading(true);
      const token = await signInWithGoogle();
      const userInfo = await getUserInfo(token);
      
      // Validate token with backend
      const response = await axios.post('/api/auth/validate', { token });
      
      if (response.data.valid) {
        setAccessToken(token);
        setUser(userInfo);
        
        // Save to localStorage
        localStorage.setItem('google_access_token', token);
        localStorage.setItem('user_info', JSON.stringify(userInfo));
        
        // Set up axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        return true;
      } else {
        throw new Error('Token validation failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (accessToken) {
        await revokeToken(accessToken);
      }
      
      setUser(null);
      setAccessToken(null);
      
      // Clear localStorage
      localStorage.removeItem('google_access_token');
      localStorage.removeItem('user_info');
      
      // Clear axios default header
      delete axios.defaults.headers.common['Authorization'];
      
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
    accessToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

