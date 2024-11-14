// store/themeStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeStore = {
  mode: 'light' | 'dark';
  toggleMode: () => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: 'light',
      toggleMode: () =>
        set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'theme-storage',
    }
  )
);
