import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getAllGuides = async () => {
  try {
    const response = await axios.get(`${API_URL}/guides`);
    return response.data;
  } catch (error) {
    console.error('Error fetching guides:', error);
    throw error;
  }
};

export const getGuideById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/guides/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching guide with id ${id}:`, error);
    throw error;
  }
};

export const getGuidesByCrop = async (cropId) => {
  try {
    const response = await axios.get(`${API_URL}/guides/crop/${cropId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching guides for crop ${cropId}:`, error);
    throw error;
  }
};

export const getGuidesByDifficulty = async (difficulty) => {
  try {
    const response = await axios.get(`${API_URL}/guides/difficulty/${difficulty}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching guides with difficulty ${difficulty}:`, error);
    throw error;
  }
};

export const getTraditionalGuides = async () => {
  try {
    const response = await axios.get(`${API_URL}/guides/traditional`);
    return response.data;
  } catch (error) {
    console.error('Error fetching traditional guides:', error);
    throw error;
  }
};

export const getModernGuides = async () => {
  try {
    const response = await axios.get(`${API_URL}/guides/modern`);
    return response.data;
  } catch (error) {
    console.error('Error fetching modern guides:', error);
    throw error;
  }
};

export const searchGuides = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/guides/search?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching guides with query ${query}:`, error);
    throw error;
  }
};
