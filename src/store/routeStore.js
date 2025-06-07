import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const store = (set) => ({
  slideDirection: 'slide-next',
  setSlideDirection: (value) => set({ slideDirection: value }),
});

export const useRouteStore = create(devtools(store, { name: 'routeStore' }));
