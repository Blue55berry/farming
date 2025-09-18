import { createContext, useState, useContext, useEffect } from 'react';
import authService from '../api/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const user = await authService.getUser();
      setCurrentUser(user);
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    await authService.login(email, password);
    const user = await authService.getUser();
    setCurrentUser(user);
    return user;
  };

  const register = async (name, email, password) => {
    await authService.register(name, email, password);
    const user = await authService.getUser();
    setCurrentUser(user);
    return user;
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  const addCoinsToUser = async (coins, source) => {
    try {
      const updatedUser = await authService.addCoins(coins, source);
      setCurrentUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("Failed to add coins and update user context:", error);
      throw error;
    }
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    addCoinsToUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
