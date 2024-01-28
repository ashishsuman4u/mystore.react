import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productApiSlice } from './apis/productApi';
import { categoryApiSlice } from './apis/categoryApi';
import { cartReducer } from './slice/cartSlice';

export const store = configureStore({
  reducer: {
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productApiSlice.middleware).concat(categoryApiSlice.middleware);
  },
});

setupListeners(store.dispatch);
export { useFetchProductsQuery, useFetchProductByIDQuery } from './apis/productApi';
export { selectAllCategories, selectCategoryById, getCategories } from './slice/categorySlice';
export {
  addItemToCart,
  removeItemFromCart,
  updateQuantityInCart,
  updateAddress,
  updateShipping,
} from './slice/cartSlice';
