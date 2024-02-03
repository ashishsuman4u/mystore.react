import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const categoryApiSlice = createApi({
  reducerPath: 'categoryApi',
  keepUnusedDataFor: 1200, //20 min
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  endpoints: () => ({}),
});
export { categoryApiSlice };
