import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productApiSlice } from './apis/productApi';
import { categoryApiSlice } from './apis/categoryApi';
import { cartReducer } from './slice/cartSlice';
import { userReducer } from './slice/userSlice';
import { loadState, saveState } from '../storage';

const initialState = loadState();

export const store = configureStore({
  reducer: {
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
    cart: cartReducer,
    user: userReducer,
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
  updateShipping,
  updateOrderId,
  resetCart,
} from './slice/cartSlice';
export {
  signIn,
  populateOrder,
  addOrder,
  addWishlistItem,
  removeWishlistItem,
  populateWishlist,
} from './slice/userSlice';
export { signout, updateAddress } from './actions';
