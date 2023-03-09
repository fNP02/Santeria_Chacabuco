import create from 'zustand';

export const useNavigationStore = create((set) => ({
  activeItem: 'home',
  activeAdminItem: 'products',
  setActiveItem: (item) => set({ activeItem: item }),
  setActiveAdminItem: (item) => set({ activeAdminItem: item }),
}));

