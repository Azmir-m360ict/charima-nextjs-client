import { baseURL, webtoken } from '@/utils/request';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {
  getCookie,
  getCookies,
  setCookie,
  deleteCookie,
  hasCookie,
} from 'cookies-next/client';

import { TagTypes } from './tagTypes';
import { site_config } from '@/lib/site_config';

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
    return response;
  },
  keepUnusedDataFor: 24 * 60,

  endpoints: () => ({}),
  tagTypes: Object.values(TagTypes),
});
