import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {StorageKeys} from "../storage/localStorage.storage.ts";
import {clearTokenInfo} from "../utils/localStorage.utils.ts";
import {TokenService} from "./services/Token.service.ts";


export const axiosClient: AxiosInstance = (() => {
    return axios.create({
        baseURL: import.meta.env.VITE_APP_API_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 seconds
        withCredentials: true,
    });
})();


axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        // Add auth token if available
        const token = localStorage.getItem(StorageKeys.ACCESS_TOKEN);
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
    }
);


interface ErrorResponse {
    message: string;
    code: string;
}

/**
 * Перехватчик ответов
 * - Handles response data transformation
 * - Manages authentication errors
 * - Standardizes error handling
 */
axiosClient.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        return response;
    },
    async (error: AxiosError<ErrorResponse>) => {
        const originalRequest = error.config;

        const rememberMe = localStorage.getItem(StorageKeys.REMEMBER_ME);


        if (error.response?.status === 401 && originalRequest && error.response.data.message === 'jwt expired') {

            if (rememberMe) {


                try {
                    const response = await TokenService.refreshToken()

                    localStorage.setItem(StorageKeys.ACCESS_TOKEN, response.data.token);
                    localStorage.setItem(StorageKeys.EXPIRED_TOKEN, response.data.expire.toString());

                    originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
                    return axiosClient(originalRequest);
                } catch (refreshError) {
                    clearTokenInfo()
                    return Promise.reject(refreshError);
                }

            } else {
                clearTokenInfo()
                return Promise.reject(error);
            }
        } else {
            return Promise.reject(error);
        }

    }
);

