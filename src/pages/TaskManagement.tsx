import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Pagination,
  MenuItem,
  Select,
} from '@mui/material';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { TaskForm } from '../components/TaskForm';
import { useTaskStore } from '../store/taskStore';
import { Task } from '../interfaces/index';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { ConfirmToast } from '../components/ConfirmToast';

export function TaskManagement() {

  const [openForm, setOpenForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const { tasks, tags, totalPages, isLoadingTasks, addTask, updateTask, deleteTask, updateTasksByPage, fillterTasks } = useTaskStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [buttonFilterStatus, setButtonFilterStatus] = useState('Filter');

  const handleOpenForm = (task?: Task) => {
    setSelectedTask(task);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setSelectedTask(undefined);
    setOpenForm(false);
  };

  const handleSubmit = (data: any) => {
    if (selectedTask) {
      updateTask(selectedTask.id, data);
    } else {
      addTask(data);
    }
    handleCloseForm();
  };

  const handleDelete = (taskId: number) => {
    ConfirmToast({
      message: 'Are you sure you want to delete this task?',
      onConfirm: () => deleteTask(taskId, currentPage), // Lógica de eliminación
    });
  };
  

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    updateTasksByPage(newPage);
    setCurrentPage(newPage);
  };

  const handleSearch = () => {
    setButtonFilterStatus('Clear Filter');
    setCurrentPage(1);
    fillterTasks(selectedTags, selectedStatus, currentPage);
  };

  const handleClearFilter = () => {
    setButtonFilterStatus('Filter');
    setSelectedTags([]);
    setSelectedStatus('');
    fillterTasks([], '', 1);
    setCurrentPage(1);
    updateTasksByPage(1);
  };

  const handleChangeSelectedTags = (selectedTags: number[]) => {
    setSelectedTags(selectedTags);
    setButtonFilterStatus('Filter');
  }

  const handleSelectStatus = (selectedStatus: string) => {
    setSelectedStatus(selectedStatus);
    setButtonFilterStatus('Filter');
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Tasks</Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => handleOpenForm()}
        >
          Add Task
        </Button>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, mb: 2, height: 50 }}>
        {/* Select by task status */}
        <Select
          value={selectedStatus}
          onChange={(e) => handleSelectStatus(e.target.value)}
          displayEmpty
          variant="outlined"
          sx={{ minWidth: 150, color: 'white' }}
        >
          <MenuItem value="">
            <em>Select Status</em>
          </MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="in_progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
        {/* Select by tags */}
        <Select
          multiple
          value={selectedTags}
          onChange={(e) => handleChangeSelectedTags(e.target.value as number[])}
          displayEmpty
          renderValue={(selected) =>
            selected.length === 0
              ? <em style={{ color: 'gray', fontSize: '1rem' }}>Select Tags</em>
              : selected
                .map((id) => tags.find((tag) => tag.id === id)?.name)
                .join(', ')
          }
          variant="outlined"
          sx={{ width: 150, color: 'white' }}
        >
          <MenuItem disabled value="">
            <em>Select Tags</em>
          </MenuItem>
          {tags.map((tag) => (
            <MenuItem key={tag.id} value={tag.id}>
              <Chip
                label={tag.name}
                sx={{
                  backgroundColor: tag.color,
                  color: 'white',
                  mr: 1,
                }}
                size="small"
              />
            </MenuItem>
          ))}
        </Select>

        <Button variant="outlined" onClick={buttonFilterStatus === 'Filter' ? handleSearch : handleClearFilter}>
          {buttonFilterStatus}
        </Button>
      </Box>
      <Card>
        {!isLoadingTasks ? (
          tasks.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Tags</TableCell>
                    <TableCell width={120}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.description}</TableCell>
                      <TableCell>
                        {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={task.status.replace('_', ' ')}
                          color={
                            task.status === 'completed'
                              ? 'success'
                              : task.status === 'in_progress'
                                ? 'warning'
                                : 'default'
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {task.tags.map((tag) => (
                            <Chip
                              key={tag.id}
                              label={tag.name}
                              size="small"
                              sx={{ backgroundColor: tag.color, color: 'white' }}
                            />
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleOpenForm(task)}
                            color="primary"
                          >
                            <Pencil size={20} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(task.id)}
                            color="error"
                          >
                            <Trash2 size={20} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box sx={{ textAlign: 'center', p: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No tasks available. Start by adding a new task!
              </Typography>
            </Box>
          )
        ) : (
          <div className="fixed inset-0 flex items-center justify-center bg-primary z-50">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </Card>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        {totalPages > 1 &&
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
          />
        }
      </Box>
      <TaskForm
        open={openForm}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        initialData={selectedTask}
        tags={tags}
      />
    </Box>
  );
}
