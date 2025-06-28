import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get all events (public)
export const getEvents = async () => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};

// Get event details by ID (public)
export const getEventById = async (id) => {
  const response = await axios.get(`${API_URL}/events/${id}`);
  return response.data;
};

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
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users/register`, userData);
  return response.data;
};

// User login
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/users/login`, credentials);
  return response.data;
};
