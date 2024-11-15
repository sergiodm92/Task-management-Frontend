import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export const AppInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return <>{children}</>;
};
