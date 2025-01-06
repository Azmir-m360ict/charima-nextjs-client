import { HTTPResponse } from '@/types/common.type';
import { baseURL, webtoken } from './request';

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const fetchRequest = async <T>(
  url: string,
  options: FetchOptions = {},
  delayMs: number = 0
): Promise<HTTPResponse<T>> => {
  const token = 'getToken()';

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token ? token : ''}`,
    webtoken: `${webtoken ? webtoken : ''}`,
    ...options.headers,
  };

  const config: FetchOptions = {
    ...options,
    headers,
    credentials: 'include',
  };

  if (delayMs > 0) {
    await delay(delayMs);
  }

  const response = await fetch(`${baseURL}${url}`, config);

  if (!response.ok) {
    const err = await response.text();
    const error = new Error(err);
    throw error;
  }

  const data: HTTPResponse<T> = await response.json();

  return data;
};
