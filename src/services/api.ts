import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DataProps } from '../context/Auth';

export const api = axios.create({
  baseURL: 'http://192.168.18.3:3333',
});

api.interceptors.request.use((config) => {
  const res = localStorage.getItem('data');
  const dataInfo: DataProps = res
  ? (JSON.parse(res) as DataProps)
  : ({} as DataProps);

  config.headers.Authorization = dataInfo.token;

  return config;
});

api.interceptors.response.use(
  (response) => new Promise((resolve) => {
    resolve(response);
  }),
  (error) => {
    const navigate = useNavigate();
    if (error.response.status === 401) {
      localStorage.removeItem('data');
      navigate('/sign-in');
    }
  }
)
