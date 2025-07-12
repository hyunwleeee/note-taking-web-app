import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { type ListLabelsType } from '@type/github';

interface LabelState {
  labelList: ListLabelsType;
  setLabelList: (list: ListLabelsType) => void;
}

export const useLabelStore = create<LabelState>()(
  persist(
    (set) => ({
      labelList: [],
      setLabelList: (list) => set({ labelList: list }),
    }),
    {
      name: 'label-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        labelList: state.labelList,
      }),
    }
  )
);

