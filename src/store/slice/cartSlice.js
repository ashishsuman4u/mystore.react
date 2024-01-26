import { createSlice } from '@reduxjs/toolkit';
// import { reset } from '../actions';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItemToCart(state, action) {
      state.push(action.payload);
    },
    removeItemFromCart(state, action) {
      state.filter((s) => s.id !== action.payload.id);
    },
  },
  extraReducers(builder) {
    // builder.addCase(reset, (state, action) => {
    //   return [];
    // });
  },
});

export const { addCart, removeCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
