import { useEffect, useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Tag } from '../interfaces/index';
import { useForm } from 'react-hook-form';
import { useTaskStore } from '../store/taskStore';

type TagFormData = Omit<Tag, 'id'>;

export function TagManagement() {

  const initializeTasks = useTaskStore((state) => state.initializeTasks);

  useEffect(() => {
    initializeTasks();
  }, [initializeTasks]);

  const [openForm, setOpenForm] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | undefined>();
  const { tags, addTag, updateTag, deleteTag } = useTaskStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TagFormData>();

  const handleOpenForm = (tag?: Tag) => {
    setSelectedTag(tag);
    reset(tag || { name: '', color: '#000000' });
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setSelectedTag(undefined);
    setOpenForm(false);
  };

  const onSubmit = (data: TagFormData) => {
    if (selectedTag) {
      updateTag(selectedTag.id, data);
    } else {
      addTag(data);
    }
    handleCloseForm();
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this tag?')) {
      deleteTag(id);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Tags</Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => handleOpenForm()}
        >
          Add Tag
        </Button>
      </Box>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Color</TableCell>
                <TableCell width={120}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tags.map((tag) => (
                <TableRow key={tag.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: 1,
                          backgroundColor: tag.color,
                        }}
                      />
                      {tag.name}
                    </Box>
                  </TableCell>
                  <TableCell>{tag.color}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenForm(tag)}
                        color="primary"
                      >
                        <Pencil size={20} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(tag.id)}
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
      </Card>

      <Dialog open={openForm} onClose={handleCloseForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            {selectedTag ? 'Edit Tag' : 'Create New Tag'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
              <TextField
                label="Name"
                fullWidth
                {...register('name', { required: 'Name is required' })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />

              <TextField
                label="Color"
                type="color"
                fullWidth
                {...register('color', { required: 'Color is required' })}
                error={!!errors.color}
                helperText={errors.color?.message}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseForm}>Cancel</Button>
            <Button type="submit" variant="contained">
              {selectedTag ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}