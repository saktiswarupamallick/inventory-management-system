import axios from 'axios';
import {
  ADD_PURCHASE,
  GET_PURCHASES,
  UPDATE_PURCHASE,
  DELETE_PURCHASE,

} from './types';

const apiUrl = 'http://localhost:9000/api/purchase/purchases';

export const addPurchase = (purchaseData) => async (dispatch) => {
  try {
    const response = await axios.post(apiUrl, purchaseData);
    dispatch({
      type: ADD_PURCHASE,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getPurchases = () => async (dispatch) => {
  try {
    const response = await axios.get(apiUrl);
    dispatch({
      type: GET_PURCHASES,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updatePurchase = (id, purchaseData) => async (dispatch) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, purchaseData);
    dispatch({
      type: UPDATE_PURCHASE,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deletePurchase = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    dispatch({
      type: DELETE_PURCHASE,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};
