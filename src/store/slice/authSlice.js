import { createSlice } from '@reduxjs/toolkit';
import { signout } from '../actions';

// const authObj = {
//   authenticated: true | false,
//   currentUser: {
//     email: 'testuser1@test.com', // string | null
//     uid: 'sgdjhgsajhfsd', // string
//     displayName: 'test user', // string | null
//     providerId: 'firebase', // string | null
//   },
// };

const initialState = {
  authenticated: false,
  currentUser: null,
};

export const authSlice = createSlice({
  name: 'auth',
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
          displayName: user.displayName,
          providerId: user.providerData[0].providerId,
        };
        return { payload: mapped };
      },
    },
  },
  extraReducers(builder) {
    builder.addCase(signout, () => initialState);
  },
});

export const { signIn, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
