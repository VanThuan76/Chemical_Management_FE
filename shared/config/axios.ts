import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { toast } from 'sonner';
import { APP_SAVE_KEY } from '@/shared/constant';
import { ENDPOINT_API_URLS } from '@/shared/constant/endpoint';

class Axios {
    private api: AxiosInstance;
    private isRefreshing = false;
    private refreshTokenRequest: Promise<string> | null = null;

    constructor(baseURL: string, noAuth: boolean) {
        this.api = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!noAuth) {
            this.api.interceptors.request.use(
                config => {
                    const accessToken = this.getAccessToken();
                    if (accessToken) {
                        config.headers.Authorization = `Bearer ${accessToken}`;
                    }
                    return config;
                },
                error => {
                    return Promise.reject(error);
                },
            );
        }

        this.handleResponse(this.api);
    }

    handleResponse(axios: AxiosInstance) {
        axios.interceptors.response.use(
            async (response: AxiosResponse) => {
                const statusCode = response.data.statusCode;
                if (typeof window !== 'undefined' && statusCode) {
                    switch (statusCode) {
                        case 403:
                            deleteCookie(APP_SAVE_KEY.TOKEN_KEY);
                            window.location.href = '/login';
                            break;
                        case 401:
                            return Promise.reject(response);
                        case 400:
                            return Promise.reject(response);
                        default:
                            break;
                    }
                }
                return response;
            },
            async error => {
                const originalRequest = error.config;

                if (error.response.status === 401 && !originalRequest._retry) {
                    const refreshToken = this.getRefreshToken();
                    if (!refreshToken) {
                        deleteCookie(APP_SAVE_KEY.TOKEN_KEY);
                        window.location.href = '/login';
                        return Promise.reject(error);
                    }
                    if (!this.isRefreshing) {
                        this.isRefreshing = true;
                        originalRequest._retry = true;
                        try {
                            const newToken = await this.refreshToken(refreshToken);
                            this.setAccessToken(newToken);
                            this.isRefreshing = false;
                            this.refreshTokenRequest = null;
                            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                            return this.api(originalRequest);
                        } catch (e) {
                            this.isRefreshing = false;
                            this.refreshTokenRequest = null;
                            deleteCookie(APP_SAVE_KEY.TOKEN_KEY);
                            // window.location.href = '/login';
                            return Promise.reject(error);
                        }
                    } else if (this.refreshTokenRequest) {
                        try {
                            const newToken = await this.refreshTokenRequest;
                            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                            return this.api(originalRequest);
                        } catch (e) {
                            deleteCookie(APP_SAVE_KEY.TOKEN_KEY);
                            // window.location.href = '/login';
                            return Promise.reject(error);
                        }
                    }
                }

                if (error.response.status === 403) {
                    deleteCookie(APP_SAVE_KEY.TOKEN_KEY);
                    window.location.href = '/login';
                }

                return Promise.reject(error);
            },
        );
    }

    async get<T>(url: string, configs?: AxiosRequestConfig): Promise<T> {
        try {
            toast.promise(
                this.api.get<T>(url, configs),
                {
                    loading: 'Loading...',
                }
            );
            const response = await this.api.get<T>(url, configs);
            return response.data;
        } catch (error) {
            console.error('GET request failed:', error);
            throw error;
        }
    }

    async post<T>(url: string, data: any, configs?: AxiosRequestConfig): Promise<T> {
        try {
            toast.promise(
                this.api.post<T>(url, data, configs),
                {
                    loading: 'Loading...',
                }
            );
            const response = await this.api.post<T>(url, data, configs);
            return response.data;
        } catch (error) {
            console.error('POST request failed:', error);
            throw error;
        }
    }

    async put<T>(url: string, data?: any, configs?: AxiosRequestConfig): Promise<T> {
        try {
            toast.promise(
                this.api.put<T>(url, data, configs),
                {
                    loading: 'Loading...',
                }
            );
            const response = await this.api.put<T>(url, data, configs);
            return response.data;
        } catch (error) {
            console.error('PUT request failed:', error);
            throw error;
        }
    }

    async patch<T>(url: string, data?: any, configs?: AxiosRequestConfig): Promise<T> {
        try {
            toast.promise(
                this.api.patch<T>(url, data, configs),
                {
                    loading: 'Loading...',
                }
            );
            const response = await this.api.patch<T>(url, data, configs);
            return response.data;
        } catch (error) {
            console.error('PATCH request failed:', error);
            throw error;
        }
    }

    async delete<T>(url: string, configs?: AxiosRequestConfig): Promise<T> {
        try {
            toast.promise(
                this.api.delete<T>(url, configs),
                {
                    loading: 'Loading...',
                }
            );
            const response = await this.api.delete<T>(url, configs);
            return response.data;
        } catch (error) {
            console.error('DELETE request failed:', error);
            throw error;
        }
    }

    private async refreshToken(refreshToken: string): Promise<string> {
        try {
            const response = await this.api.post(ENDPOINT_API_URLS.REFRESH_TOKEN, {
                refresh_token: refreshToken,
            });
            return response.data.data.original.access_token;
        } catch (error) {
            console.error('Refresh token request failed:', error);
            throw error;
        }
    }

    private getAccessToken(): string {
        return getCookie(APP_SAVE_KEY.TOKEN_KEY) as string;
    }

    private getRefreshToken(): string | null {
        return getCookie(APP_SAVE_KEY.REFRESH_TOKEN_KEY) as string;
    }

    private setAccessToken(token: string) {
        setCookie(APP_SAVE_KEY.TOKEN_KEY, token);
    }
}

export const axiosInstance = new Axios(process.env.NEXT_PUBLIC_API_URL as string, false);
export const axiosInstanceNoAuth = new Axios(process.env.NEXT_PUBLIC_API_URL as string, true);
