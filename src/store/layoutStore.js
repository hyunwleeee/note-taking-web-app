import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const store = (set, get) => ({
  deviceType: 'laptop',
  isModalOpen: false,
  showPopList: [],

  setDeviceType: (value) => set({ deviceType: value }),
  setIsModalOpen: (value) => set({ isModalOpen: value }),
  setShowPop: (id) => {
    const arr = [...get().showPopList, id];
    set({ showPopList: arr });
  },
});

export const useLayoutStore = create(devtools(store, { name: 'layoutStore' }));
