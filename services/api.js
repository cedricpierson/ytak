import axios from 'axios';

const api = axios.create({
  baseURL: /*import.meta.process.env.VITE_BACKEND_URL ?? */ 'http://localhost:5000',
});

export default api;
