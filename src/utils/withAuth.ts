import { info } from "@constants/info";
import { useAuthStore } from "@store/authStore";
import { mapGitHubError } from "@type/errors/github-error";
import { isAxiosError, type AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

type WithGithubOwnerAuthCallback<R> = (
  options: Partial<AxiosRequestConfig>
) => R;

export const withGithubOwnerAuth = async <R>(callback: WithGithubOwnerAuthCallback<R>) => {
  try {
    return await callback({
      headers: {
        accept: 'application/vnd.github+json',
        Authorization: `Bearer ${info.accessToken}`,
        'X-Github-Api-Version': '2022-11-28',
      },
    });
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      toast.error(mapGitHubError(status, data).message);
    } else {
      toast.error('알 수 없는 오류가 발생했습니다.');
    }
    throw error;
  }
};

type WithUserCallback<R> = () => R;

export const withUserAuth = <R>(callback: WithUserCallback<R>): R => {
  const { user, role } = useAuthStore();

  if (!user) {
    toast.error('로그인이 필요합니다.');
    throw new Error('로그인이 필요합니다.');
  }

  if (!role || role === 'user') {
    toast.error('접근 권한이 없습니다.');
    throw new Error('접근 권한이 없습니다.');
  }

  return callback();
};
