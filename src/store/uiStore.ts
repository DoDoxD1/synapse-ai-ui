import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  loading: boolean;
  error: string | null;
  
  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  loading: false,
  error: null,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
