import { GITHUB_API_ROUTES } from '@constants/github-api-routes';
import { useQuery } from '@hooks/useQuery';
import { ListLabelsType } from '@type/github';
import { withAuth } from '@utils/withAuth';
import { type UseQueryReturnType } from '@hooks/useQuery';

export const getUserInfo = (username: string) => {
  return useQuery(GITHUB_API_ROUTES.users.users(username));
};

// export const getRepoLabels = (owner: string, repo: string) => {
//   return withAuth<UseQueryReturnType<ListLabelsType>>((options) =>
//     useQuery(GITHUB_API_ROUTES.repos.labels(owner, repo), options)
//   );
// };

export const getRepoLabels = <T>(owner: string, repo: string) =>
  useQuery<T>(GITHUB_API_ROUTES.repos.labels(owner, repo));


export const getRepoIssues = <T>(owner: string, repo: string, page: number, per_page: number) => {
  return useQuery<T>(GITHUB_API_ROUTES.repos.issues(owner, repo, page, per_page));
};

export const getRepoIssue = <T>(owner: string, repo: string, issue_number: number) => {
  return useQuery<T>(GITHUB_API_ROUTES.repos.issue(owner, repo, issue_number));
};
