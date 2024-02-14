import { createSlice } from '@reduxjs/toolkit';
import { signout, updateAddress } from '../actions';
import { upsert } from '../../helpers';

// const userObj = {
//   authenticated: true | false,
//   currentUser: {
//     email: 'testuser1@test.com', // string | null
//     uid: 'sgdjhgsajhfsd', // string
//     displayName: 'test user', // string | null
//     providerId: 'firebase', // string | null
//   },
//   orders: [],
//   wishlist: []
// };

const initialState = {
  authenticated: false,
  currentUser: null,
  orders: [],
  wishlist: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: {
      reducer: (state, action) => {
        state.authenticated = true;
        state.currentUser = action.payload;
      },
      prepare: (user) => {
        const mapped = {
          uid: user.uid,
          email: user.email,
          providerId: user.providerData[0].providerId,
        };
        return { payload: mapped };
      },
    },
    populateOrder(state, action) {
      state.orders = action.payload.sort((a, b) => b.orderDate - a.orderDate);
    },
    populateWishlist(state, action) {
      state.wishlist = action.payload;
    },
    addOrder(state, action) {
      upsert(state.orders, action.payload);
    },
    addWishlistItem(state, action) {
      upsert(state.wishlist, action.payload);
    },
    removeWishlistItem(state, action) {
      const index = state.wishlist.findIndex((s) => s.id === action.payload.id);
      state.wishlist.splice(index, 1);
    },
  },
  extraReducers(builder) {
    builder.addCase(signout, () => initialState);
    builder.addCase(updateAddress, (state, action) => {
      state.address = action.payload;
    });
  },
});

export const { signIn, populateOrder, addOrder, addWishlistItem, removeWishlistItem, populateWishlist } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
