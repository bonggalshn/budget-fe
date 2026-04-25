import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { User, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await api.getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (identifier: string, password: string) => {
    try {
      const response = await api.login(identifier, password);
      localStorage.setItem('token', response.token);
      const userData = await api.getCurrentUser();
      setUser(userData);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.logout();
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      await api.register(username, email, password);
      navigate('/login');
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};