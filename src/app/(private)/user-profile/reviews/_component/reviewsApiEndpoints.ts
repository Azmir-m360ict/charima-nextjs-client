import { baseApi } from '@/lib/features/RTK/BaseApi';
import { HTTPResponse } from '@/types/common.type';
import { IProductReviewList } from '@/types/Product.type';
import { API_ENDPOINTS } from '@/utils/api-call/api-endpoints';

export const reviewsApiEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation<HTTPResponse<void>, FormData>({
      query: (body) => ({
        url: API_ENDPOINTS.PRODUCT_REVIEW_OF_CUSTOMER,
        method: 'POST',
        body,
      }),

      invalidatesTags: ['REVIEW'],
    }),
    getCustomerAllReview: builder.query<HTTPResponse<void>, void>({
      query: (body) => ({
        url: API_ENDPOINTS.PRODUCT_REVIEW_OF_CUSTOMER,
        method: 'GET',
      }),

      providesTags: ['REVIEW'],
    }),

    getProductAllReview: builder.query<
      HTTPResponse<IProductReviewList[]>,
      { product_id?: number }
    >({
      query: ({ product_id }) => ({
        url: `${API_ENDPOINTS.PRODUCT_REVIEW}/${product_id}`,
        method: 'GET',
      }),

      providesTags: ['REVIEW'],
    }),
  }),
});

export const {
  useAddReviewMutation,
  useGetCustomerAllReviewQuery,
  useGetProductAllReviewQuery,
} = reviewsApiEndpoints;
