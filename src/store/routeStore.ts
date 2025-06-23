import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type SlideDirection =
  | 'slide-next'
  | 'slide-prev'
  | 'null';

interface RouteState {
  slideDirection: SlideDirection;
  setSlideDirection: (value: SlideDirection) => void;
}

export const useRouteStore = create<RouteState>()(
  devtools((set) => ({
    slideDirection: 'slide-next',
    setSlideDirection: (value) => set(() => ({ slideDirection: value })),
  }),
    { name: 'routeStore' }
  )
);

