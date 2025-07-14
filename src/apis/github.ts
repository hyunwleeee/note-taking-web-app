import { GITHUB_API_ROUTES } from '@constants/github-api-routes';
import { useQuery } from '@hooks/useQuery';
import { IssueType, ListLabelsType } from '@type/github';
import { withAuth } from '@utils/withAuth';
import { type UseQueryReturnType } from '@hooks/useQuery';
import { useMutation, UseMutationReturnType } from '@hooks/useMutation';

export const getUserInfo = (username: string) => {
  return useQuery(GITHUB_API_ROUTES.users.users(username));
};

export const getRepoLabels = (owner: string, repo: string) => {
  return withAuth<UseQueryReturnType<ListLabelsType>>((options) =>
    useQuery(GITHUB_API_ROUTES.repos.labels(owner, repo), options)
  );
};

export const getRepoIssues = (owner: string, repo: string, page: number, per_page: number) => {
  return withAuth<UseQueryReturnType<IssueType[]>>((options) =>
    useQuery(GITHUB_API_ROUTES.repos.issues(owner, repo, page, per_page), options)
  );
};

export const getRepoIssue = (owner: string, repo: string, issue_number: number) => {
  return withAuth<UseQueryReturnType<IssueType>>((options) =>
    useQuery(GITHUB_API_ROUTES.repos.issue(owner, repo, issue_number), options)
  );
};

export const addLabelsToIssue = (
  owner: string,
  repo: string,
  issue_number: number
) => {
  return withAuth<
    UseMutationReturnType<{ labels: string[] }, ListLabelsType>
  >((options) =>
    useMutation<{ labels: string[] }, ListLabelsType>(
      GITHUB_API_ROUTES.repos.addLabelsToIssue(owner, repo, issue_number),
      options
    )
  );
};

export const removeLabelFromIssue = (
  owner: string,
  repo: string,
  issue_number: number,
) => {
  return withAuth<
    UseMutationReturnType<any, ListLabelsType>
  >((options) =>
    useMutation<any, ListLabelsType>(
      GITHUB_API_ROUTES.repos.removeLabelFromIssue(owner, repo, issue_number),
      { ...options, method: 'DELETE' }
    )
  );
}
