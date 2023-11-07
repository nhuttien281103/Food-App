import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  allUsers: null,
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.currentUser = action.payload;
    },
    userLogout: (state) => {
      state.currentUser = null;
    },
    getAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userLogin, userLogout, getAllUsers } = authSlice.actions;

export default authSlice.reducer;
