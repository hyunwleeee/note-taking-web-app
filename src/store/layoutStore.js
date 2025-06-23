import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const store = (set, get) => ({
  deviceType: 'laptop',
  isModalOpen: false,

  setDeviceType: (value) => set({ deviceType: value }),
  setIsModalOpen: (value) => set({ isModalOpen: value }),
});

export const useLayoutStore = create(devtools(store, { name: 'layoutStore' }));
