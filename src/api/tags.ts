import { ApiError } from '../interfaces/auth';
import axiosInstance from '../config/axiosConfig';
import { CreateTag, GetTagsResponse } from '../interfaces/tags';


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
        console.log(error);
        if (error.status === 409) {
            alert('Tag already exists');
        }
        const apiError: ApiError = {
            message: error.response?.data?.message || error.message,
        };
        throw apiError;
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
        if (error.status === 405) {
            alert('The tag is being used by a task, please delete the task before deleting the tag');
        }
    }
};