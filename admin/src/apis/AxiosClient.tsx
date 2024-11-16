import { notification } from 'antd';
import axios, { AxiosResponse } from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
console.log('🚀 ~ API_URL:', API_URL);
const AxiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-type': 'application/json',
    },
});

// handle request to convert all api requests to snake_case
AxiosClient.interceptors.request.use(async (config: any) => {
    const token = '';

    const newConfig = { ...config };
    if (token && newConfig.headers) {
        // newConfig.headers.token = `${token}`;
        newConfig.headers.Authorization = `Bearer ${token}`;
    }

    if (newConfig.headers && newConfig.headers['Content-Type'] === 'multipart/form-data') return newConfig;

    // convert request to snake_case
    if (config.params) {
        newConfig.params = config.params;
    }
    if (config.data) {
        newConfig.data = config.data;
    }

    return newConfig;
});

// handle response to convert all api responses to camelCase
AxiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response && response.data) {
            // cover response to camelCase
            return response.data;
        }

        return response;
    },
    (error) => {
        if (error?.response?.data?.code === 401) {
            notification.error({
                message: error?.response.statusText,
            });
            localStorage.clear();
            window.location.reload();
        } else {
            if (error?.message) {
                notification.error({
                    message: error?.response?.data?.message || error?.message,
                });
            }
        }

        return {
            ...error?.response?.data,
            status: false,
        };
    }
);

export default AxiosClient;
