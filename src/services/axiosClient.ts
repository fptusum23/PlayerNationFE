import axios, { AxiosResponse } from 'axios';
import queryString from 'query-string';

const VITE_APP_API = import.meta.env.VITE_APP_API;

const axiosClient = axios.create({
    baseURL: VITE_APP_API,
    headers: {
        'Content-Type': 'application/json',
    },
});
export default axiosClient;
