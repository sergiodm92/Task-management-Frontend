import { ApiError } from '../interfaces/auth';
import axiosInstance from '../config/axiosConfig';
import { CreateTag, GetTagsResponse } from '../interfaces/tags';
import toast from 'react-hot-toast';


export const getAllTags = async (): Promise<GetTagsResponse> => {
    try {
        const response = await axiosInstance.get<GetTagsResponse>(`/tags`);
        return response.data;
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response?.data?.message || error.message,
        };
        throw apiError;
    }
};


export const createTag = async (tag: CreateTag): Promise<any> => {
    try {
        const response = await axiosInstance.post<any>(`/tags`, tag);
        return response.data;
    } catch (error: any) {
      throw error;
    }
};

export const updateTag = async (id: number, tag: Partial<any>): Promise<any> => {
    try {
        const response = await axiosInstance.put<any>(`/tags/${id}`, tag);

        return response.data;
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response?.data?.message || error.message,
        };
        throw apiError;
    }
};

export const deleteTag = async (id: number): Promise<any> => {
    try {
        const response = await axiosInstance.delete(`/tags/${id}`);
        return response;
    } catch (error: any) {
      throw error;
    }
};