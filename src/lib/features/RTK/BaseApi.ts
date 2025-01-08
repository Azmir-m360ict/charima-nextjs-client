import { baseURL, webtoken } from '@/utils/request';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { getCookie } from 'cookies-next/client';

import { site_config } from '@/lib/site_config';
import { toast } from 'sonner';
import { TagTypes } from './tagTypes';

interface EnhancedFetchArgs extends FetchArgs {
  token?: string;
}

const baseQuery: BaseQueryFn<
  string | EnhancedFetchArgs,
  unknown,
  FetchBaseQueryError
> = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: 'include',
  prepareHeaders: async (headers, { getState }) => {
    const token = await getCookie(site_config.token_name);

    if (webtoken) {
      headers.set('webtoken', `${webtoken}`);
    }

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
  },
});

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: async (args: string | EnhancedFetchArgs, api, extraOptions) => {
    const response = await baseQuery(args, api, extraOptions);

    if ('error' in response) {
      if (response.error && 'data' in response.error) {
        const errorData = response.error.data as {
          success: boolean;
          message: string;
          type: string;
          status: number;
        };

        toast.error(errorData?.message, { position: 'top-right' });
      }
    }

    return response;
  },
  keepUnusedDataFor: 24 * 60,

  endpoints: () => ({}),
  tagTypes: Object.values(TagTypes),
});
