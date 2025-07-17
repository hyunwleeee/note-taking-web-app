import { create } from 'zustand';

import { type ListLabelsType } from '@type/github';
import { addLabelsToIssue, getRepoLabels, removeLabelFromIssue } from '@apis/github';

interface ILabelStore {
  labelList: ListLabelsType;
  fetchLabelList: () => Promise<void>;
  addLabelList: (issue_number: number, labels: string[]) => Promise<void>;
  deleteLabel: (issue_number: number, label: string) => Promise<void>;
}

export const useLabelStore = create<ILabelStore>((set) => ({
  labelList: [],
  fetchLabelList: async () => {
    const labelList = await getRepoLabels();
    set({ labelList });
  },
  addLabelList: async (issue_number: number, labels: string[]) => {
    await addLabelsToIssue(issue_number, labels)
  },
  deleteLabel: async (issue_number: number, label: string) => {
    await removeLabelFromIssue(issue_number, label)
  }
}));
