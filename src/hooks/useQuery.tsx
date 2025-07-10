import { useState, useEffect, useCallback } from 'react';
import axiosClient from '@utils/axios-client';
import { AxiosError, AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';
import { toast } from 'react-toastify';

export function useQuery<T>(
  url: string,
  options?: AxiosRequestConfig,
  enabled: boolean = true,
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<T> = await axiosClient<T>(url, options);
      setData(response.data);
    } catch (err) {
      if (isAxiosError(error)) {
        setError(error);
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (enabled) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [enabled, fetchData]);

  const refetch = () => {
    if (enabled !== false) {
      fetchData();
    }
  };

  return { data, isLoading, error, refetch };
}

export type UseQueryReturnType<T> = {
  data: T | null;
  isLoading: boolean;
  error: AxiosError | null;
  refetch: () => void;
};


