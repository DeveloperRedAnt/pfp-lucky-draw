import axios from 'axios';

const api = axios.create({
  // Change baseURL if needed
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
