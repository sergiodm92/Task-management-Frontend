import { ApiError } from '../interfaces/auth';
import axiosInstance from '../config/axiosConfig';
import { CreateTask, CreateTaskResponse, GetTasksResponse } from '../interfaces/tasks';
import { Task } from '../interfaces';
import { taskForPage } from '../config/site.config';

export const getAllTasks = async (page: number = 1, limit: number = taskForPage): Promise<GetTasksResponse> => {
    try {
        const response = await axiosInstance.get<GetTasksResponse>(`/tasks`, {
            params: { page, limit },
        });
        return response.data;
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response?.data?.message || error.message,
        };
        throw apiError;
    }
};

export const getTasksByTagsAndStatus = async (tags: number[], status: string, page: number = 1, limit: number = taskForPage): Promise<GetTasksResponse> => {
    try {
        // Create the query string for the tags
        const tagsQuery = tags.map((tag) => `tags=${tag}`).join('&');
        // Build the URL with tags and status
        const queryString = `${tagsQuery}${status ? `&status=${status}` : ''}`;
        // Make the request with pagination and limit
        const response = await axiosInstance.get<GetTasksResponse>(`/tasks/tags?${queryString}`, {
            params: { page, limit },
        });
        return response.data;
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response?.data?.message || error.message,
        };
        throw apiError;
    }
};

export const createNewTaskApi = async (task: CreateTask): Promise<CreateTaskResponse> => {
    try {
        const response = await axiosInstance.post<CreateTaskResponse>(`/tasks`, task);
        return response.data;
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response?.data?.message || error.message,
        };
        throw apiError;
    }
};

export const updateTask = async (id: number, task: Partial<Task>): Promise<any> => {
    try {
        const taskSend = {
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            status: task.status,
            tags: task.tags
        }
        const response = await axiosInstance.put<any>(`/tasks/${id}`, taskSend);
        return response.data;
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response?.data?.message || error.message,
        };
        throw apiError;
    }
};

export const deleteTask = async (id: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/tasks/${id}`);
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response?.data?.message || error.message,
        };
        throw apiError;
    }
};

