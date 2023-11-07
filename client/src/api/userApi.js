import { getAllUsers } from '@/context/slices/authSlice';
import * as httpRequest from '@/utils/httpRequest';

//! check validate token
export const validateUserJWTToken = async (token) => {
  try {
    const response = await httpRequest.get(`/api/users/jwtVerification`, {
      headers: { Authorization: 'Bearer ' + token },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

//! check validate token
export const getAllUsersApi = () => async (dispatch) => {
  try {
    const response = await httpRequest.get(`/api/users/all-users`);
    dispatch(getAllUsers(response.data));
  } catch (error) {
    return null;
  }
};
