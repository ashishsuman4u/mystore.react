import { createSlice } from '@reduxjs/toolkit';
// import { reset } from '../actions';

// const cartObj = [{
//   id,
//   product,
//   quantity,
// }]

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItemToCart: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(product, quantity) {
        return {
          payload: {
            id: product.id,
            product,
            quantity,
          },
        };
      },
    },
    updateQuantityInCart: {
      reducer(state, action) {
        const index = state.findIndex((s) => s.id === action.payload.id);
        state[index] = action.payload;
      },
      prepare(product, quantity) {
        return {
          payload: {
            id: product.id,
            product,
            quantity,
          },
        };
      },
    },
    removeItemFromCart(state, action) {
      const index = state.findIndex((s) => s.id === action.payload.id);
      state.splice(index, 1);
    },
  },
  extraReducers(builder) {
    // builder.addCase(reset, (state, action) => {
    //   return [];
    // });
  },
});

export const { addItemToCart, removeItemFromCart, updateQuantityInCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
