import { info } from "@constants/info";
import { useAuthStore } from "@store/authStore";
import { type AxiosRequestConfig, isAxiosError } from "axios";
import { toast } from "react-toastify";

type WithOwnerAuthCallback<R> = (
  options: Partial<AxiosRequestConfig>
) => R;

type WithUserCallback<R> = () => R;

export const withOwnerAuth = <R>(callback: WithOwnerAuthCallback<R>): R => {
  try {
    return callback({
      headers: {
        accept: 'application/vnd.github+json',
        Authorization: `Bearer ${info.accessToken}`,
        'X-Github-Api-Version': '2022-11-28'
      },
    });
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response?.status === 401) {
      toast.error('관리자에게 문의해주시기 바랍니다.');
      window.location.replace('/login');
    }
    throw error;
  }
};

export const withUserAuth = <R>(callback: WithUserCallback<R>): R => {
  const { user, role } = useAuthStore.getState();

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
