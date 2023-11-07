import * as httpRequest from '@/utils/httpRequest';
import {
  getAllProductStart,
  getAllProductSuccess,
  getAllProductFail,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFail,
} from '@/context/slices/productSlice';
import {
  addItemCartFail,
  addItemCartStart,
  addItemCartSuccess,
  getAllCartFail,
  getAllCartStart,
  getAllCartSuccess,
} from '@/context/slices/cartSlice';

//! handle add new product
export const addNewProduct = async (data) => {
  try {
    const response = await httpRequest.post(`/api/products/add-product`, {
      ...data,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//! handle get all product
export const getAllProductApi = () => async (dispatch) => {
  try {
    dispatch(getAllProductStart());
    const response = await httpRequest.get(`/api/products/all-products`);
    dispatch(getAllProductSuccess(response.data));
  } catch (error) {
    dispatch(getAllProductFail(error.message));
  }
};

//! handle delete product
export const deleteProductApi = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductStart());
    const response = await httpRequest.deleted(
      `/api/products/delete-product/${id}`,
    );
    dispatch(deleteProductSuccess(response.data));
  } catch (error) {
    dispatch(deleteProductFail(error.message));
  }
};

//! handle create cart
export const createCartApi = (userId, data) => async (dispatch) => {
  try {
    dispatch(addItemCartStart());
    const response = await httpRequest.post(
      `/api/products/add-to-cart/${userId}`,
      {
        ...data,
      },
    );
    dispatch(addItemCartSuccess(response.data));
  } catch (error) {
    dispatch(addItemCartFail(error.message));
  }
};

//! handle get all cart
export const getAllCartApi = (userId) => async (dispatch) => {
  try {
    dispatch(getAllCartStart());
    const response = await httpRequest.get(
      `/api/products/get-all-cart/${userId}`,
    );
    dispatch(getAllCartSuccess(response.data));
  } catch (error) {
    dispatch(getAllCartFail(error.message));
  }
};

//! handle update cart
export const updateItemQuantityCartApi = async (userId, productId, type) => {
  try {
    const response = await httpRequest.post(
      `/api/products/update-cart/${userId}`,
      null,
      { params: { productId: productId, type: type } },
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
