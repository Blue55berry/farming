import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getProblemsByPlant = async (plantType) => {
  try {
    const response = await axios.get(`${API_URL}/diagnosis/plant/${plantType}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching problems for plant ${plantType}:`, error);
    throw error;
  }
};

export const diagnosePlantProblem = async (plantType, symptoms) => {
  try {
    const response = await axios.post(`${API_URL}/diagnosis/analyze`, {
      plantType,
      symptoms
    });
    return response.data;
  } catch (error) {
    console.error('Error diagnosing plant problem:', error);
    throw error;
  }
};

export const getSolutionsForProblem = async (problemId) => {
  try {
    const response = await axios.get(`${API_URL}/diagnosis/solutions/${problemId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching solutions for problem ${problemId}:`, error);
    throw error;
  }
};

export const getCommonProblems = async () => {
  try {
    const response = await axios.get(`${API_URL}/diagnosis/common`);
    return response.data;
  } catch (error) {
    console.error('Error fetching common problems:', error);
    throw error;
  }
};
