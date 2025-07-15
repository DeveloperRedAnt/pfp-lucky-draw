import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';
export const queryClient = new QueryClient();

const api = axios.create({
  // Change baseURL if needed
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
