import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getAllCrops = async () => {
  try {
    const response = await axios.get(`${API_URL}/crops`);
    return response.data;
  } catch (error) {
    console.error('Error fetching crops:', error);
    throw error;
  }
};

export const getCropById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/crops/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching crop with id ${id}:`, error);
    throw error;
  }
};

export const getCropsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/crops/category/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching crops in category ${category}:`, error);
    throw error;
  }
};

export const searchCrops = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/crops/search?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching crops with query ${query}:`, error);
    throw error;
  }
};
