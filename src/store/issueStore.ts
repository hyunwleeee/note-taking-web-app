import { create } from 'zustand';

import { type IssueType } from '@type/github';
import { getRepoIssues } from '@apis/github';

interface IIssuesStore {
  issueList: IssueType[];
  fetchIssueList: (page?: number, per_page?: number) => Promise<void>;
}

export const useIssueStore = create<IIssuesStore>((set) => ({
  issueList: [],
  fetchIssueList: async (page = 1, per_page = 10) => {
    const issueList = await getRepoIssues(page, per_page);
    set({ issueList });
  },
}));
