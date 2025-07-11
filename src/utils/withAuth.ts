import { info } from "@constants/info";
import { useAuthStore } from "@store/authStore";
import { type AxiosRequestConfig, isAxiosError } from "axios";
import { toast } from "react-toastify";

type WithAuthCallback<R> = (
  options: Partial<AxiosRequestConfig>
) => R;


export const withAuth = <R>(callback: WithAuthCallback<R>): R => {
  try {
    // const { token } = useAuthStore.getState();

    return callback({
      headers: {
        Authorization: `Bearer ${info.accessToken}`,
      },
    });
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response?.status === 401) {
      toast.error('로그인이 필요합니다.');
      window.location.replace('/login');
    }
    throw error;
  }
};

