import { baseApi } from '@/lib/features/RTK/BaseApi';
import { HTTPResponse } from '@/types/common.type';
import { API_ENDPOINTS } from '@/utils/api-call/api-endpoints';
import {
  IAddress,
  IProfileData,
  IUpdateAddress,
} from './ProfileResponseInterface';

export const profileApiEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ADDRESS_______________
    CreateAddress: builder.mutation<HTTPResponse<void>, IAddress>({
      query: (body) => ({
        url: API_ENDPOINTS.ADDRESS_LIST,
        method: 'POST',
        body,
      }),

      invalidatesTags: ['ADDRESS'],
    }),
    GetAddress: builder.query<HTTPResponse<IAddress[]>, void>({
      query: (body) => ({
        url: API_ENDPOINTS.ADDRESS_LIST,
        method: 'GET',
      }),

      providesTags: ['ADDRESS'],
    }),
    GetAddressForEdit: builder.query<HTTPResponse<IAddress>, { id: string }>({
      query: ({ id }) => ({
        url: `${API_ENDPOINTS.ADDRESS_LIST}/${id}`,
        method: 'GET',
      }),

      providesTags: ['ADDRESS'],
    }),

    UpdateAddress: builder.mutation<
      HTTPResponse<void>,
      { body: IUpdateAddress; id: string }
    >({
      query: ({ body, id }) => ({
        url: `${API_ENDPOINTS.ADDRESS_LIST}/${id}`,
        method: 'PATCH',
        body,
      }),

      invalidatesTags: ['ADDRESS'],
    }),

    // PROFILE _________________
    GetProfile: builder.query<HTTPResponse<IProfileData>, void>({
      query: (body) => ({
        url: API_ENDPOINTS.USERS_ME,
        method: 'GET',
      }),
      providesTags: ['PROFILE'],
    }),

    UploadProfileData: builder.mutation<HTTPResponse<void>, FormData>({
      query: (body) => ({
        url: API_ENDPOINTS.USERS_ME,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['PROFILE'],
    }),

    // CHANGE PASSWORD

    ChangePassword: builder.mutation<
      HTTPResponse<void>,
      { old_password: string; new_password: string }
    >({
      query: (body) => ({
        url: API_ENDPOINTS.CHANGE_PASSWORD,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['PROFILE'],
    }),
  }),
});

export const {
  useCreateAddressMutation,
  useGetAddressQuery,
  useGetAddressForEditQuery,
  useUpdateAddressMutation,
  useGetProfileQuery,
  useUploadProfileDataMutation,
  useChangePasswordMutation,
} = profileApiEndpoints;
