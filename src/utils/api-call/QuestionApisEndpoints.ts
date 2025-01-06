import { baseApi } from '@/lib/features/RTK/BaseApi';
import { HTTPResponse } from '@/types/common.type';
import {
  IProductQuestion,
  IProductQuestionForCustomer,
} from '@/types/Product.type';
import { API_ENDPOINTS } from './api-endpoints';

export const QuestionApisEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    aksQuestion: builder.mutation<
      HTTPResponse<void>,
      { question: string; product_id: number }
    >({
      query: (body) => ({
        url: API_ENDPOINTS.CUSTOMER_QUESTION,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['PRODUCT_TABS'],
    }),

    getQuestionForProduct: builder.query<
      HTTPResponse<IProductQuestion[]>,
      { product_id: number }
    >({
      query: ({ product_id }) => ({
        url: `${API_ENDPOINTS.PRODUCT_QUESTION}/${product_id}`,
        method: 'GET',
      }),
      providesTags: ['PRODUCT_TABS'],
    }),

    getAllQuestionForCustomer: builder.query<
      HTTPResponse<IProductQuestionForCustomer[]>,
      void
    >({
      query: () => ({
        url: `${API_ENDPOINTS.CUSTOMER_QUESTION}`,
        method: 'GET',
      }),
      providesTags: ['PRODUCT_TABS'],
    }),
    deleteQuestion: builder.mutation<
      HTTPResponse<void>,
      { product_id: number }
    >({
      query: ({ product_id }) => ({
        url: `${API_ENDPOINTS.CUSTOMER_QUESTION}/${product_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PRODUCT_TABS'],
    }),
  }),
});

export const {
  useAksQuestionMutation,
  useDeleteQuestionMutation,
  useGetQuestionForProductQuery,
  useGetAllQuestionForCustomerQuery,
} = QuestionApisEndpoints;
