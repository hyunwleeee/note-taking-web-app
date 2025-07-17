import { AxiosRequestConfig } from "axios";
import axiosClient from "./axios-client";

export const query = async <T>(
  url: string,
  options?: AxiosRequestConfig,
): Promise<T> => {
  // NOTE: cache busting
  const cacheBustingUrl = `${url}${url.includes('?') ? '&' : '?'}_=${new Date().getTime()}`;
  const response = await axiosClient<T>(cacheBustingUrl, options);
  return response.data;
};

export const mutate = async <T, R>(
  url: string,
  options?: AxiosRequestConfig,
  data?: R,
): Promise<T> => {
  const response = await axiosClient<T>(url, {
    method: "POST",
    ...options,
    data,
  });
  return response.data;
};
