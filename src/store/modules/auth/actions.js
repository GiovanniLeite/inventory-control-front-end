import * as types from '../types';

export const loginRequest = (payload) => {
  return {
    type: types.LOGIN_REQUEST,
    payload,
  };
};

export const loginSuccess = (payload) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload,
  };
};

export const loginFailure = (payload) => {
  return {
    type: types.LOGIN_FAILURE,
    payload,
  };
};

export const registerRequest = (payload) => {
  return {
    type: types.REGISTER_REQUEST,
    payload,
  };
};

export const registerUpdatedSuccess = (payload) => {
  return {
    type: types.REGISTER_UPDATED_SUCCESS,
    payload,
  };
};

export const registerCreatedSuccess = (payload) => {
  return {
    type: types.REGISTER_CREATED_SUCCESS,
    payload,
  };
};

export const registerFailure = (payload) => {
  return {
    type: types.REGISTER_FAILURE,
    payload,
  };
};
