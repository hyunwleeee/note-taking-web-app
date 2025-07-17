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
    issues: (owner: string, repo: string) => {
      return `${API_URL}/repos/${owner}/${repo}/issues`;
    },
    /**
     * @name GET /repos/{owner}/{repo}/issues/{issue_number}
     * @description 해당 레포지토리의 특정 이슈 가져오기
     * @link https://docs.github.com/ko/rest/issues/issues?apiVersion=2022-11-28#get-an-issue
     */
    issue: (owner: string, repo: string, issue_number: number) =>
      `${API_URL}/repos/${owner}/${repo}/issues/${issue_number}`,

    /**
     * @name POST /repos/{owner}/{repo}/issues/{issue_number}/labels
     * @description 해당 이슈에 라벨 추가하기
     * @link https://docs.github.com/ko/rest/issues/labels?apiVersion=2022-11-28#add-labels-to-an-issue
     */
    addLabelsToIssue: (owner: string, repo: string, issue_number: number) =>
      `${API_URL}/repos/${owner}/${repo}/issues/${issue_number}/labels`,

    /**
     * @name DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}
     * @description 해당 이슈에서 특정 라벨 제거하기
     * @link https://docs.github.com/ko/rest/issues/labels?apiVersion=2022-11-28#remove-a-label-from-an-issue
     */
    removeLabelFromIssue: (
      owner: string,
      repo: string,
      issue_number: number,
      label_name: string
    ) => `${API_URL}/repos/${owner}/${repo}/issues/${issue_number}/labels/${label_name}`,
  },
} as const;
