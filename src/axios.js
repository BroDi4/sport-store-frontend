import axios from 'axios';

const axiosQuery = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:4000',
});

axiosQuery.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default axiosQuery;
