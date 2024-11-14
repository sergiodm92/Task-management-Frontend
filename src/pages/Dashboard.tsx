import { Box, Grid, Paper, Typography } from '@mui/material';
import {
  CheckCircle2,
  Clock,
  Loader,
  ListTodo,
  Tags as TagsIcon,
} from 'lucide-react';
import { useTaskStore } from '../store/taskStore';

export function Dashboard() {
  const tasks = useTaskStore((state) => state.tasks);
  const tags = useTaskStore((state) => state.tags);
  const { totalTasks, taskCountsByState } = useTaskStore((state) => state);


  const stats = {
    total: totalTasks,
    completed: tasks.filter((task) => task.status === 'completed').length,
    pending: tasks.filter((task) => task.status === 'pending').length,
    inProgress: tasks.filter((task) => task.status === 'in_progress').length,
    totalTags: tags.length,
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
  }: {
    title: string;
    value: number;
    icon: typeof CheckCircle2;
    color: string;
  }) => (
    <Paper
      sx={{
        p: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        height: '100%',
      }}
    >
      <Box
        sx={{
          backgroundColor: `${color}20`,
          p: 1,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={24} color={color} />
      </Box>
      <Box>
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
        <Typography color="text.secondary">{title}</Typography>
      </Box>
    </Paper>
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Tasks"
            value={stats.total}
            icon={ListTodo}
            color="#2563eb"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed"
            value={taskCountsByState.completed}
            icon={CheckCircle2}
            color="#16a34a"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="In Progress"
            value={ taskCountsByState.in_progress}
            icon={Loader}
            color="#758a1a"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending"
            value={ taskCountsByState.pending}
            icon={Clock}
            color="#ca8a04"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Tags"
            value={stats.totalTags}
            icon={TagsIcon}
            color="#9333ea"
          />
        </Grid>
      </Grid>
    </Box>
  );
}