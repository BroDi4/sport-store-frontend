import axios from 'axios';

const axiosQuery = axios.create({
  baseURL: 'http://localhost:4000',
});

axiosQuery.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default axiosQuery;
