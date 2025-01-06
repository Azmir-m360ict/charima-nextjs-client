import { baseApi } from '@/lib/features/RTK/BaseApi';
import { HTTPResponse } from '@/types/common.type';
import {
  IOrderList,
  IPurchase,
  ISingleOrderDetails,
} from '@/types/Product.type';
import { API_ENDPOINTS } from './api-endpoints';

export const OrderApisEndpoints = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    orderConfirm: builder.mutation<HTTPResponse<void>, IPurchase>({
      query: (body) => ({
        url: API_ENDPOINTS.PRODUCT_ORDER,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ORDER'],
    }),

    getAllOrder: builder.query<
      HTTPResponse<IOrderList[]>,
      { limit: number; skip: number }
    >({
      query({ limit, skip }) {
        return {
          url: `${API_ENDPOINTS.PRODUCT_ORDER}?limit=${limit}&skip=${skip}`,
          method: 'GET',
        };
      },
      providesTags: ['ORDER'],
    }),

    getSingleOrderDetails: builder.query<
      HTTPResponse<ISingleOrderDetails>,
      { id: string }
    >({
      query({ id }) {
        return {
          url: `${API_ENDPOINTS.PRODUCT_ORDER}/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['ORDER', 'REVIEW'],
    }),
  }),
});

export const {
  useOrderConfirmMutation,
  useGetAllOrderQuery,
  useGetSingleOrderDetailsQuery,
} = OrderApisEndpoints;
