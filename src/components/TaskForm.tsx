import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Task, Tag, TaskStatus } from '../interfaces/index';
import { TaskFormData } from '../interfaces/tasks';



type TaskFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
  initialData?: Task;
  tags: Tag[];
};

const statusOptions: TaskStatus[] = ['pending', 'in_progress', 'completed'];

export function TaskForm({ open, onClose, onSubmit, initialData, tags }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm<TaskFormData>({
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      dueDate: initialData? (new Date(initialData.dueDate)) : new Date(),
      status: initialData?.status || 'pending',
      tags: initialData?.tags.map((tag)=>tag.id) || [],
    },
  });

  useEffect(() => {
    if (open) {
      reset(
        {
          title: initialData?.title || '',
          description: initialData?.description || '',
          dueDate: initialData? (new Date(initialData.dueDate)) : new Date(),
          status: initialData?.status || 'pending',
          tags: initialData?.tags.map((tag)=>tag.id) || [],
        });
    }
  }, [open, initialData, reset]);

  const selectedTags = watch('tags')

  const handleClearTags = () => {
    setValue('tags', []); // Limpia el campo de etiquetas
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          {initialData ? 'Edit Task' : 'Create New Task'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Title"
              fullWidth
              {...register('title', { required: 'Title is required' })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              {...register('description', { required: 'Description is required' })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <Controller
              name="dueDate"
              control={control}
              rules={{ required: 'Due date is required' }}
              render={({ field }) => (
                <DatePicker
                  label="Due Date"
                  value={field.value}
                  onChange={field.onChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.dueDate,
                      helperText: errors.dueDate?.message,
                    },
                  }}
                />
              )}
            />

            <Controller
              name="status"
              control={control}
              rules={{ required: 'Status is required' }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.status}>
                  <InputLabel>Status</InputLabel>
                  <Select {...field} label="Status">
                    {statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            <Box>
              {selectedTags && selectedTags.length > 0 &&
                <Button variant='outlined' color="primary" onClick={handleClearTags} sx={{ mb: 1 }}>
                  Clear All Tags
                </Button>
              }
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Tags</InputLabel>
                    <Select
                      {...field}
                      multiple
                      input={<OutlinedInput label="Tags" />}
                      renderValue={(selectedIds) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selectedIds.map((id: any) => {
                            const selectedTag = tags.find((tag) => tag.id == id);
                            return (
                              selectedTag && (
                                <Chip
                                  key={selectedTag.id}
                                  label={selectedTag.name}
                                  sx={{ backgroundColor: selectedTag.color, color: 'white', cursor: 'pointer' }}
                                  onClick={() => {
                                    field.onChange(selectedIds.filter((selectedId) => selectedId !== id));
                                  }}
                                />
                              )
                            );
                          })}
                        </Box>
                      )}
                    >
                      {tags
                        .filter((tag) => !field.value.some((selectedTag: any) => selectedTag.id === tag.id))
                        .map((tag) => (
                          <MenuItem key={tag.id} value={tag.id}>
                            <Chip
                              size="small"
                              label={tag.name}
                              sx={{ backgroundColor: tag.color, color: 'white' }}
                            />
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Box>

          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {initialData ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
