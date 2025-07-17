import { GITHUB_API_ROUTES } from '@constants/github-api-routes';
import { useQuery } from '@hooks/useQuery';
import { IssueType, ListLabelsType } from '@type/github';
import { withGithubOwnerAuth } from '@utils/withAuth';
import { info } from '@constants/info';
import { mutate, query } from '@utils/apis';

export const getUserInfo = (username: string) => {
  return useQuery(GITHUB_API_ROUTES.users.users(username));
};

export const getRepoIssues = (page: number, per_page: number) => {
  return withGithubOwnerAuth<Promise<IssueType[]>>((options) =>
    query(GITHUB_API_ROUTES.repos.issues(info.username, info.repo), { params: { page, per_page }, ...options })
  );
};

export const getRepoIssue = (issue_number: number) => {
  return withGithubOwnerAuth<Promise<IssueType>>((options) =>
    query(GITHUB_API_ROUTES.repos.issue(info.username, info.repo, issue_number), options)
  );
};

export const getRepoLabels = () => {
  return withGithubOwnerAuth<Promise<ListLabelsType>>((options) =>
    query(GITHUB_API_ROUTES.repos.labels(info.username, info.repo), options)
  );
};

export const addLabelsToIssue = (
  issue_number: number,
  labels: string[],
) => {
  return withGithubOwnerAuth<Promise<ListLabelsType>>((options) =>
    mutate<ListLabelsType, { labels: string[] }>(
      GITHUB_API_ROUTES.repos.addLabelsToIssue(info.username, info.repo, issue_number),
      { ...options, method: 'POST' },
      { labels }
    )
  );
};

export const removeLabelFromIssue = (
  issue_number: number,
  label_name: string,
) => {
  return withGithubOwnerAuth((options) =>
    mutate<void, { labels: string[] }>(
      GITHUB_API_ROUTES.repos.removeLabelFromIssue(info.username, info.repo, issue_number, label_name),
      { ...options, method: 'DELETE' }
    )
  );
}
