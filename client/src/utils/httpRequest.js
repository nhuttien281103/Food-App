import axios from 'axios';

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// handle http request methods get
export const get = async (path, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};

// handle http request methods post
export const post = async (path, data, options = {}) => {
  const response = await httpRequest.post(path, data, options);
  return response.data;
};

// handle http request methods delete
export const deleted = async (path, options = {}) => {
  const response = await httpRequest.delete(path, options);
  return response.data;
};

export default httpRequest;
