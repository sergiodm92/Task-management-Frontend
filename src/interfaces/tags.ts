type Tags = {
    id: number;
    name: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
};

export interface GetTagsResponse {
    status: string;
    statusCode: number;
    message: string;
    data: Tags[];
}

export interface CreateTag {
    name: string;
    color: string;
}

interface TaskData {
    id: number;
    name: string;
    color: string;
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
}

export interface CreateTaskResponse {
    status: string;
    statusCode: number;
    message: string;
    data: TaskData;
}