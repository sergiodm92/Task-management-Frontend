export type User = {
  id: number;
  email: string;
};

export type Tag = {
  id: number;
  name: string;
  color: string;
};

export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  status: TaskStatus;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
};