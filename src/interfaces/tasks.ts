

type TaskStatus = 'pending' | 'in_progress' | 'completed';

type Tag = {
    id: number;
    name: string;
    color: string;
};
type Task = {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    status: TaskStatus;
    tags: Tag[];
    createdAt: Date;
    updatedAt: Date;
};
interface DataGetTasksResponse {
    tasks: Task[];
    currentPage: number;
    totalPages: number;
    totalTasks: number;
    taskCountsByState: CountTasksState
}

export interface GetTasksResponse {
    status: string;
    statusCode: number;
    message: string;
    data: DataGetTasksResponse;
}

export interface CreateTask {
    title: string;
    description: string;
    dueDate: Date;
    status: TaskStatus;
    tags: Tag[];
}

interface TaskData {
    id: number;
    title: string;
    description: string;
    dueDate: string; // ISO 8601 date string
    status: 'pending' | 'in_progress' | 'completed';
    tags: Tag[]; // Assuming Tag is defined elsewhere in your code
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
}

export interface CreateTaskResponse {
    status: string;
    statusCode: number;
    message: string;
    data: TaskData;
}
export type TaskFormData = {
    title: string;
    description: string;
    dueDate: Date;
    status: TaskStatus;
    tags: number[];
}

export type CountTasksState = {
    completed: number;
    in_progress: number;
    pending: number;
}



export type AddTask = Omit<Task, "id" | "createdAt" | "updatedAt">;