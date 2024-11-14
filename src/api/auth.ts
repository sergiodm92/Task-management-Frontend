import { Credentials, UserData, AuthResponse, ApiError, GetUserResponse } from '../interfaces/auth';
import axiosInstance from '../config/axiosConfig';
import { User } from '../interfaces';


export const login = async (credentials: Credentials): Promise<AuthResponse> => {
    try {
        const response = await axiosInstance.post<AuthResponse>(`/auth/login`, credentials);
        return response.data;
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response?.data?.message || error.message,
        };
        throw apiError;
    }
};

export const register = async (userData: UserData): Promise<AuthResponse> => {
    try {
        const response = await axiosInstance.post<AuthResponse>(`/auth/register`, userData);
        return response.data;
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response?.data?.message || error.message,
        };
        throw apiError;
    }
};

export const getUser = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get<User>('/auth/user');
        return response.data;
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response?.data?.message || error.message,
        };
        throw apiError;
    }
};
