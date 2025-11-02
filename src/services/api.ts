import axios from 'axios'
import type { Data } from '@measured/puck'

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
})


api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config
});

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    token: string;
    user: {
        id: string;
        username: string;
        email: string;
    }
}

export const authAPI = {
    register: async (data: RegisterData): Promise<AuthResponse> => {
        const response = await api.post('/register', data);
        return response.data;
    },

    login: async (data: LoginData): Promise<AuthResponse> => {
        const response = await api.post('/login', data);
        return response.data;
    }
};


export const pagesAPI = {
    getPage: async (): Promise<{ page: { data: Data; updatedAt: string} | null }> => {
        const response = await api.get('/pages');
        return response.data;
    },

    savePage: async (pageData: Data): Promise<{ message: string }> => {
        const response = await api.post('/pages', { pageData });
        return response.data;
    }
};


export default api;

