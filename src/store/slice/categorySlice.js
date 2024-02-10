import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';

import { categoryApiSlice } from '../apis/categoryApi';

const categoriesAdapter = createEntityAdapter();

const initialState = categoriesAdapter.getInitialState();

export const extendedCategorySlice = categoryApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => '/categories',
      transformResponse: (res) => {
        return categoriesAdapter.setAll(initialState, res);
      },
    }),
  }),
});

export const getCategories = extendedCategorySlice.endpoints.getCategories;
const selectCategoriesData = createSelector(getCategories.select(), (categoriesResult) => categoriesResult.data);

export const { selectAll: selectAllCategories, selectById: selectCategoryById } = categoriesAdapter.getSelectors(
  (state) => selectCategoriesData(state) ?? initialState
);
