import { baseApi } from '@/lib/features/RTK/BaseApi';
import { IAllAttributesList } from '@/types/Category.type';

import {
  HTTPResponse,
  IGetAllArea,
  IGetAllCities,
  IGetAllProvince,
  IGetAllSubCities,
  ISignUp,
} from '@/types/common.type';
import { ISearchProduct } from '@/types/Product.type';
import { API_ENDPOINTS } from './api-endpoints';

export const commonApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<HTTPResponse<void>, ISignUp>({
      query: (body) => ({ url: '/ecomm/auth/signup', method: 'POST', body }),

      invalidatesTags: ['COMMON'],
    }),
    getAllAttributes: builder.query<HTTPResponse<IAllAttributesList>, void>({
      query: (body) => ({
        url: '/ecomm/product/attribute',
        method: 'GET',
        body,
      }),
      providesTags: ['COMMON'],
    }),

    getAllDistrict: builder.query<HTTPResponse<IGetAllProvince[]>, void>({
      query: (body) => ({
        url: API_ENDPOINTS.GET_ALL_PROVINCE,
        method: 'GET',
      }),
      providesTags: ['ADDRESS-SELECT'],
    }),

    getAllCities: builder.query<
      HTTPResponse<IGetAllCities[]>,
      { district_id: string }
    >({
      query: ({ district_id }) => ({
        url: `${API_ENDPOINTS.GET_ALL_CITIES}${district_id}`,
        method: 'GET',
      }),
      providesTags: ['ADDRESS-SELECT'],
    }),

    getAllSubCities: builder.query<
      HTTPResponse<IGetAllSubCities[]>,
      { city_id: string }
    >({
      query: ({ city_id }) => ({
        url: `${API_ENDPOINTS.GET_ALL_SUB_CITIES}${city_id}`,
        method: 'GET',
      }),
      providesTags: ['ADDRESS-SELECT'],
    }),

    getAllArea: builder.query<
      HTTPResponse<IGetAllArea[]>,
      { sub_city_id: string }
    >({
      query: ({ sub_city_id }) => ({
        url: `${API_ENDPOINTS.GET_ALL_AREA}${sub_city_id}`,
        method: 'GET',
      }),
      providesTags: ['ADDRESS-SELECT'],
    }),

    getSearchProductList: builder.query<
      HTTPResponse<ISearchProduct[]>,
      { search: string }
    >({
      query: ({ search }) => ({
        url: `/ecomm/product?name=${search}`,
        method: 'GET',
      }),
      providesTags: ['PRODUCT_SEARCH'],
    }),

    sendOtp: builder.mutation<
      HTTPResponse<void>,
      { email: string; type: 'forget_admin' | 'forget_customer' }
    >({
      query: (body) => ({
        url: `/common/send-email-otp`,
        method: 'POST',
        body,
      }),
    }),

    matchOtp: builder.mutation<
      HTTPResponse<void>,
      { email: string; type: 'forget_admin' | 'forget_customer'; otp: string }
    >({
      query: (body) => ({
        url: `/common/match-email-otp`,
        method: 'POST',
        body,
      }),
    }),

    changeForgotPassword: builder.mutation<
      HTTPResponse<void>,
      { token: string; password: string }
    >({
      query: (body) => ({
        url: `/ecomm/auth/forget/password`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useGetAllAttributesQuery,
  useGetAllDistrictQuery,
  useGetAllCitiesQuery,
  useGetAllAreaQuery,
  useGetAllSubCitiesQuery,
  useGetSearchProductListQuery,
  useSendOtpMutation,
  useMatchOtpMutation,
  useChangeForgotPasswordMutation,
} = commonApis;
