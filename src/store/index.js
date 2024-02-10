import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productApiSlice } from './apis/productApi';
import { categoryApiSlice } from './apis/categoryApi';
import { cartReducer } from './slice/cartSlice';
import { authReducer } from './slice/authSlice';
import { loadState, saveState } from '../sessionStorage';

const initialState = loadState();

export const store = configureStore({
  reducer: {
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productApiSlice.middleware).concat(categoryApiSlice.middleware);
  },
  preloadedState: initialState,
});

setupListeners(store.dispatch);
store.subscribe(() => {
  saveState(store.getState());
});

export { useFetchProductsQuery, useFetchProductByIDQuery } from './apis/productApi';
export { selectAllCategories, selectCategoryById, getCategories } from './slice/categorySlice';
export {
  addItemToCart,
  initialiseCartFromDB,
  removeItemFromCart,
  updateQuantityInCart,
  updateAddress,
  updateShipping,
  updateOrderId,
  resetCart,
} from './slice/cartSlice';
export { signIn, logout } from './slice/authSlice';
export { signout } from './actions';
