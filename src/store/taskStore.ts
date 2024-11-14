import { create } from 'zustand';
import { Task, Tag } from '../interfaces';
import {
  getAllTasks,
  createNewTaskApi,
  updateTask,
  deleteTask,
  getTasksByTagsAndStatus
} from '../api/tasks';
import {
  getAllTags,
  createTag,
  updateTag,
  deleteTag
} from '../api/tags';
import { CountTasksState, GetTasksResponse } from '../interfaces/tasks';
import { CreateTag, GetTagsResponse } from '../interfaces/tags';
import { CreateTask } from '../interfaces/tasks';

type TaskStore = {
  tasks: Task[];
  totalTasks: number;
  totalPages: number;
  tags: Tag[];
  isLoadingTasks: boolean;
  taskCountsByState: CountTasksState;
  initializeTasks: () => Promise<void>;
  updateTasksByPage: (page: number) => Promise<void>;
  fillterTasks: (selectedTags: number[], selectedStatus: string, page: number) => Promise<void>; // Agrega selectedStatus
  addTask: (task: CreateTask) => Promise<void>;
  updateTask: (id: number, task: CreateTask) => Promise<void>;
  deleteTask: (id: number, currentPage: number) => Promise<void>;
  addTag: (tag: CreateTag) => Promise<void>;
  updateTag: (id: number, tag: Partial<Tag>) => Promise<void>;
  deleteTag: (id: number) => Promise<void>;
  clearTaskStates: () => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  tags: [],
  isLoadingTasks: false,
  totalTasks: 0,
  totalPages: 0,
  taskCountsByState: {
    completed: 0,
    in_progress: 0,
    pending: 0
  },

  initializeTasks: async () => {
    set({ isLoadingTasks: true });
    try {
      const responseTasks: GetTasksResponse = await getAllTasks();
      const responseTags: GetTagsResponse = await getAllTags();
      if (responseTasks.statusCode === 200 && responseTags.statusCode === 200) {
        set({
          tasks: responseTasks.data.tasks,
          tags: responseTags.data,
          isLoadingTasks: false,
          totalTasks: responseTasks.data.totalTasks,
          totalPages: responseTasks.data.totalPages,
          taskCountsByState: {
            completed: responseTasks.data.taskCountsByState.completed,
            in_progress: responseTasks.data.taskCountsByState.in_progress,
            pending: responseTasks.data.taskCountsByState.pending
          }
        });
      }
    } catch (error) {
      console.error('Error while initializing tasks:', error);
      set({ isLoadingTasks: false });
    }
  },

  updateTasksByPage: async (page: number) => {
    set({ isLoadingTasks: true });
    try {
      const responseTasks: GetTasksResponse = await getAllTasks(page);
      if (responseTasks.statusCode === 200) {
        set({
          tasks: responseTasks.data.tasks,
          isLoadingTasks: false,
          totalTasks: responseTasks.data.totalTasks,
          totalPages: responseTasks.data.totalPages,
        });
      }
    } catch (error) {
      console.error('Error while updating tasks by page:', error);
      set({ isLoadingTasks: false });
    }
  },

  fillterTasks: async (selectedTags: number[], selectedStatus: string, page: number) => {
    set({ isLoadingTasks: true });
    try {
      const responseTasks: GetTasksResponse = await getTasksByTagsAndStatus(selectedTags, selectedStatus, page);
      if (responseTasks.statusCode === 200) {
        set({
          tasks: responseTasks.data.tasks,
          isLoadingTasks: false,
          totalTasks: responseTasks.data.totalTasks,
          totalPages: responseTasks.data.totalPages,
        });
      }
    } catch (error) {
      console.error('Error while filtering tasks:', error);
      set({ isLoadingTasks: false });
    }
  },

  addTask: async (task: CreateTask) => {
    try {
      const response = await createNewTaskApi(task);
      if (response.statusCode === 201) {
        set((state: any) => ({
          tasks: [response.data, ...state.tasks]
        }));
      }
    } catch (error) {
      console.error('Error while adding task:', error);
    }
  },

  updateTask: async (id: number, updatedTask: CreateTask) => {
    try {
      await updateTask(id, updatedTask);
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id
            ? { ...task, ...updatedTask, tags: state.tags.filter((tag: any) => updatedTask.tags.includes(tag.id)) }
            : task
        ),
      }));
    } catch (error) {
      console.error('Error while updating task:', error);
    }
  },

  deleteTask: async (id, currentPage) => {
    try {
      await deleteTask(id);
      await useTaskStore.getState().updateTasksByPage(currentPage);
    } catch (error) {
      console.error('Error while deleting task:', error);
    }
  },

  addTag: async (tag) => {
    try {
      const response = await createTag(tag);
      if (response.statusCode === 201) {
        set((state) => ({
          tags: [...state.tags, response.data],
        }));
      }
    } catch (error) {
      console.error('Error while adding tag:', error);
    }
  },

  updateTag: async (id, updatedTag) => {
    try {
      const response = await updateTag(id, updatedTag);
      if (response.statusCode === 200) {
        set((state) => ({
          tags: state.tags.map((tag) => (tag.id === id ? response.data : tag)),
        }));
      }
    } catch (error) {
      console.error('Error while updating tag:', error);
    }
  },

  deleteTag: async (id) => {
    try {
      const response = await deleteTag(id);
      if (response.status === 204) {
        set((state) => ({
          tags: state.tags.filter((tag) => tag.id !== id),
        }));
      }
    } catch (error) {
      console.error('Error while deleting tag:', error);
    }
  },

  clearTaskStates: () => {
    set({
      tasks: [],
      tags: [],
      isLoadingTasks: false,
      totalTasks: 0,
      totalPages: 0,
      taskCountsByState: {
        completed: 0,
        in_progress: 0,
        pending: 0
      }
    });
  }
}));
