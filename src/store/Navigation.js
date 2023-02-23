import create from 'zustand';

export const useNavigationStore = create((set) => ({
  activeItem: 'home',
  setActiveItem: (item) => set({ activeItem: item }),
}));

