import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const PAGE_SIZE = 8;

const productApiSlice = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  keepUnusedDataFor: 1200, //20 min
  endpoints(builder) {
    return {
      fetchProducts: builder.query({
        query: (arg) => {
          const offset = (arg.page - 1) * PAGE_SIZE;
          return {
            url: !arg.filter
              ? `/products?offset=${offset}&limit=${PAGE_SIZE}`
              : `/products?offset=${offset}&limit=${PAGE_SIZE}${arg.filter}`,
            method: 'GET',
          };
        },
      }),
      fetchProductByID: builder.query({
        query: (id) => {
          return {
            url: `/product/${id}`,
            method: 'GET',
          };
        },
      }),
    };
  },
});
export const { useFetchProductsQuery, useFetchProductByIDQuery } = productApiSlice;
export { productApiSlice };
