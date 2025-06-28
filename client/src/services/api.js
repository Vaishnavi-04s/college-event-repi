import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

<<<<<<< HEAD
// Get all events (public)
=======
// Set auth token if available
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Event API calls
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
export const getEvents = async () => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};

<<<<<<< HEAD
// Get event details by ID (public)
=======
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
export const getEventById = async (id) => {
  const response = await axios.get(`${API_URL}/events/${id}`);
  return response.data;
};

<<<<<<< HEAD
// Create event (requires auth token and FormData because of file upload)
export const createEvent = async (eventData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axios.post(`${API_URL}/events/create`, eventData, config);
  return response.data;
};

// Register for event with form data (public or auth)
export const registerForEvent = async (eventId, formData, token = null) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
  const response = await axios.post(
    `${API_URL}/events/${eventId}/register`,
    formData,
    config
  );
  return response.data;
};

// User registration
=======
export const createEvent = async (eventData) => {
  const response = await axios.post(`${API_URL}/events`, eventData);
  return response.data;
};

export const registerForEvent = async (eventId) => {
  const response = await axios.post(`${API_URL}/events/${eventId}/register`);
  return response.data;
};

// Auth API calls
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users/register`, userData);
  return response.data;
};

<<<<<<< HEAD
// User login
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/users/login`, credentials);
  return response.data;
};
=======
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/users/login`, credentials);
  return response.data;
};
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
