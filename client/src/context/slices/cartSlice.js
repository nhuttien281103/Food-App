import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: null,
  loading: false,
  message: '',
  isModalCart: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    //! get all items cart
    getAllCartStart: (state) => {
      state.loading = true;
    },
    getAllCartSuccess: (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
    },
    getAllCartFail: (state, action) => {
      state.message = action.payload;
    },

    //! add items cart
    addItemCartStart: (state) => {
      state.loading = false;
    },
    addItemCartSuccess: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
    addItemCartFail: (state, action) => {
      state.message = action.payload;
    },

    //! modal cart
    setModalCartOpen: (state) => {
      state.isModalCart = true;
    },

    setModalCartClose: (state) => {
      state.isModalCart = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getAllCartStart,
  getAllCartSuccess,
  getAllCartFail,
  addItemCartStart,
  addItemCartSuccess,
  addItemCartFail,
  setModalCartClose,
  setModalCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
