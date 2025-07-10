const API_URL = import.meta.env.VITE_GITHUB_API_URL;

export const GITHUB_API_ROUTES = {
  users: {
    /**
     * @name GET /users/{username}
     * @description 사용자 정보 가져오기
     * @link https://docs.github.com/ko/rest/users/users?apiVersion=2022-11-28#get-a-user
     */
    users: (username: string) => `${API_URL}/users/${username}`,
  },
  repos: {
    /**
     * @name GET /repos/{owner}/{repo}/labels
     * @description 해당 레포지토리의 레이블 모두 가져오기
     * @link https://docs.github.com/en/rest/issues/labels?apiVersion=2022-11-28#list-labels-for-a-repository
     */
    labels: (owner: string, repo: string) =>
      `${API_URL}/repos/${owner}/${repo}/labels`,

    /**
     * @name GET /repos/{owner}/{repo}/issues?page:{page}&per_page:{per_page}
     * @description 해당 레포지토리의 이슈 모두 가져오기
     * @link https://docs.github.com/ko/rest/issues/issues?apiVersion=2022-11-28#list-repository-issues
     */
    issues: (owner: string, repo: string, page: number, per_page: number) => {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        per_page: per_page.toString(),
      });
      return `${API_URL}/repos/${owner}/${repo}/issues?${searchParams.toString()}`;
    },
    /**
     * @name GET /repos/{owner}/{repo}/issues/{issue_number}
     * @description 해당 레포지토리의 특정 이슈 가져오기
     * @link https://docs.github.com/ko/rest/issues/issues?apiVersion=2022-11-28#get-an-issue
     */
    issue: (owner: string, repo: string, issue_number: number) =>
      `${API_URL}/repos/${owner}/${repo}/issues/${issue_number}`,
  },
} as const;
