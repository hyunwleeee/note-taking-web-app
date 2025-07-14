import axiosClient from '@utils/axios-client';
import { type AxiosResponse, type AxiosRequestConfig, isAxiosError, AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function useMutation<T, R>(
  url: string,
  options?: AxiosRequestConfig,
) {
  const [data, setData] = useState<R | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mutate = async (body: T, slug?: string) => {
    setIsLoading(true);
    try {
      const baseurl = slug ? `${url}/${slug}` : url;
      const response: AxiosResponse<R> = await axiosClient(baseurl, {
        ...options,
        method: options?.method || 'POST',
        data: body
      });
      setData(response.data);
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err);
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return { data, isLoading, error, mutate };
}

export type UseMutationReturnType<T, R> = {
  data: R | null;
  isLoading: boolean;
  error: AxiosError | null;
  mutate: (body: T, slug?: string) => Promise<void>;
};
