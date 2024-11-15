import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Menu,
  Home,
  CheckSquare,
  Tags,
  LogOut,
  ChevronLeft,
  Sun,
  Moon,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { useTaskStore } from '../store/taskStore';

const drawerWidth = 180;

export function Layout() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const toggleMode = useThemeStore((state) => state.toggleMode);
  const darkMode = useThemeStore((state) => state.mode);
  const { clearTaskStates } = useTaskStore();

  const menuItems = [
    { text: 'Dashboard', icon: <Home size={24} />, path: '/dashboard' },
    { text: 'Tasks', icon: <CheckSquare size={24} />, path: '/tasks' },
    { text: 'Tags', icon: <Tags size={24} />, path: '/tags' },
  ];
  const initializeTasks = useTaskStore((state) => state.initializeTasks);

  useEffect(() => {
    initializeTasks();
  }, [initializeTasks, clearTaskStates]);

  const handleLogout = () => {
    clearTaskStates();
    logout();
  };

  return (
    
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: theme.zIndex.drawer + 1,
            color: 'white',
            boxShadow: 'none',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={() => setOpen(!open)}
              edge="start"
              sx={{ mr: 2 }}
            >
              {open ? <ChevronLeft size={24} /> : <Menu size={24} />}
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Task Manager
            </Typography>
            <Typography variant="body1" sx={{ mr: 2 }}>
              {user?.email}
            </Typography>
            <IconButton color="inherit" onClick={() => toggleMode()}>
              {darkMode === "dark" ? <Sun /> : <Moon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
              borderRight: '1px solid',
              borderColor: 'divider',
              transform: open ? 'none' : `translateX(-${drawerWidth}px)`,
              transition: theme.transitions.create('transform', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <List>
              {menuItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    selected={location.pathname === item.path}
                    onClick={() => navigate(item.path)}
                    sx={{
                      '&.Mui-selected': {
                        backgroundColor: 'primary.light',
                        color: 'primary.main',
                        '&:hover': {
                          backgroundColor: 'primary.light',
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: location.pathname === item.path ? 'primary.main' : 'inherit',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Box sx={{ flexGrow: 1 }} />
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon>
                    <LogOut size={24} />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: `calc(100% - ${open ? drawerWidth : 0}px)`,
            ml: open ? `0px` : `-${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>

    
  );
}