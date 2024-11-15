import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Guardian } from '../components/Guardian';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Dashboard } from '../pages/Dashboard';
import { TaskManagement } from '../pages/TaskManagement';
import { TagManagement } from '../pages/TagManagement';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        element={
          <Guardian>
            <Layout />
          </Guardian>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<TaskManagement />} />
        <Route path="/tags" element={<TagManagement />} />
      </Route>

      {/* Default Route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
