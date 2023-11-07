import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productsAll: null,
  productDetail: null,
  loading: false,
  message: '',
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    //! get all products
    getAllProductStart: (state) => {
      state.loading = true;
    },

    getAllProductSuccess: (state, action) => {
      state.loading = false;
      state.productsAll = action.payload;
    },

    getAllProductFail: (state, action) => {
      state.message = action.payload;
    },

    //! delete products
    deleteProductStart: (state) => {
      state.loading = true;
    },

    deleteProductSuccess: (state) => {
      state.loading = false;
    },

    deleteProductFail: (state, action) => {
      state.message = action.payload;
    },

    //! update products
    updateProductStart: (state) => {
      state.loading = true;
    },

    updateProductSuccess: (state, action) => {
      state.loading = false;
      state.productsAll = action.payload;
    },

    updateProductFail: (state, action) => {
      state.message = action.payload;
    },

    //! get detail products
    getDetailProductStart: (state) => {
      state.loading = true;
    },

    getDetailProductSuccess: (state, action) => {
      state.loading = false;
      state.productDetail = action.payload;
    },

    getDetailProductFail: (state, action) => {
      state.message = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getAllProductStart,
  getAllProductSuccess,
  getAllProductFail,
  getDetailProductStart,
  getDetailProductSuccess,
  getDetailProductFail,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFail,
} = productSlice.actions;

export default productSlice.reducer;
