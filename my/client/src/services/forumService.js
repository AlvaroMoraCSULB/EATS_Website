import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getThreads = async () => {
  const response = await axios.get(`${API_URL}/api/forum`);
  return response.data;
};

export const createThread = async (content, token) => {
  const response = await axios.post(
    `${API_URL}/api/forum`,
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const addComment = async (threadId, content, token) => {
  const response = await axios.post(
    `${API_URL}/api/forum/${threadId}/comments`,
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};