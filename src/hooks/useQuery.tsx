import { useState, useEffect } from 'react';
import axiosClient from '@utils/axios-client';
import { AxiosError, AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';

export function useQuery<T>(
  url: string,
  options?: AxiosRequestConfig,
  enabled: boolean = true,
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // NOTE: cache busting
      const cacheBustingUrl = `${url}${url.includes('?') ? '&' : '?'}_=${new Date().getTime()}`;
      const response: AxiosResponse<T> = await axiosClient<T>(cacheBustingUrl, options);
      setData(response.data);
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err);
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (enabled) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [enabled, url]);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch }
}

export type UseQueryReturnType<T> = {
  data: T | null;
  isLoading: boolean;
  error: AxiosError | null;
  refetch: () => void;
};
