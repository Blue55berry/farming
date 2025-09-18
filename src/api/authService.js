import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

const register = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/register`, { name, email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    setAuthToken(response.data.token);
  }
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    setAuthToken(response.data.token);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
  setAuthToken(null);
};

const getUser = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    setAuthToken(token);
    try {
      const response = await axios.get(`${API_URL}/me`);
      return response.data;
    } catch (error) {
      // If the token is invalid, remove it
      logout();
      return null;
    }
  } 
  return null;
};

const addCoins = async (coins, source) => {
  const response = await axios.post(`${API_URL}/add-coins`, { coins, source });
  return response.data;
};

export default {
  register,
  login,
  logout,
  getUser,
  setAuthToken,
  addCoins
};