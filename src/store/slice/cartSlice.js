import { createSlice } from '@reduxjs/toolkit';

// const cartObj = {
//   items: [
//     {
//       id: 1,
//       product: {},
//       quantity: 1,
//     },
//   ],
//   totalValue: 232,
//   shippingType: "Standard", //Standard|Express
//   shippingValue: 10,
//   address: {
//     name: 'John Doe',
//     streetLine1: 'abc street',
//     streetLine2: 'block xyz',
//     city: 'New York',
//     state: 'NY',
//     country: 'United States',
//     countryCode: 'US',
//     zip: '10001',
//   },
// };

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalValue: 0,
    shippingType: 'Standard',
    shippingValue: parseInt(process.env.REACT_APP_STANDARD_SHIPPING_COST),
    address: {
      name: '',
      streetLine1: '',
      streetLine2: '',
      city: '',
      state: '',
      country: '',
      countryCode: '',
      zip: '',
    },
  },
  reducers: {
    addItemToCart: {
      reducer(state, action) {
        state.items.push(action.payload);
        state.totalValue = state.items.reduce((sum, item) => {
          return sum + item.product.price * item.quantity;
        }, 0);
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
        const index = state.items.findIndex((s) => s.id === action.payload.id);
        state.items[index] = action.payload;
        state.totalValue = state.items.reduce((sum, item) => {
          return sum + item.product.price * item.quantity;
        }, 0);
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
      const index = state.items.findIndex((s) => s.id === action.payload.id);
      state.items.splice(index, 1);
      state.totalValue = state.items.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
      }, 0);
    },
    updateAddress(state, action) {
      state.address = action.payload;
    },
    updateShipping(state, action) {
      state.shippingType = action.payload.shippingType;
      state.shippingValue = action.payload.shippingValue;
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateQuantityInCart, updateAddress, updateShipping } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
