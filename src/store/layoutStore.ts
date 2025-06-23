import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type DeviceType = 'mobile' | 'tablet' | 'laptop';

interface LayoutState {
  deviceType: DeviceType;
  isModalOpen: boolean;
  setDeviceType: (value: DeviceType) => void;
  setIsModalOpen: (value: boolean) => void;
}

export const useLayoutStore = create<LayoutState>()(
  devtools((set) => ({
    deviceType: 'laptop',
    isModalOpen: false,
    setDeviceType: (value) => set(() => ({ deviceType: value })),
    setIsModalOpen: (value) => set(() => ({ isModalOpen: value })),
  }), { name: 'layoutStore' })
);

