import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Set auth token if available
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Event API calls
export const getEvents = async () => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};

export const getEventById = async (id) => {
  const response = await axios.get(`${API_URL}/events/${id}`);
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await axios.post(`${API_URL}/events`, eventData);
  return response.data;
};

export const registerForEvent = async (eventId) => {
  const response = await axios.post(`${API_URL}/events/${eventId}/register`);
  return response.data;
};

// Auth API calls
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/users/login`, credentials);
  return response.data;
};