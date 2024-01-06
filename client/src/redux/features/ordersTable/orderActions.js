import axios from 'axios';
import {
  ADD_ORDER,
  GET_ORDERS,
  UPDATE_ORDER,
  DELETE_ORDER,
  IMPORT_ORDERS

} from './types';

const apiUrl = 'http://localhost:9000/api/orders';

export const addOrder = (orderData) => async (dispatch) => {
  try {
    const response = await axios.post(apiUrl, orderData);
    dispatch({
      type: ADD_ORDER,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getOrders = () => async (dispatch) => {
  try {
    const response = await axios.get(apiUrl);
    dispatch({
      type: GET_ORDERS,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateOrder = (id, orderData) => async (dispatch) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, orderData);
    dispatch({
      type: UPDATE_ORDER,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    dispatch({
      type: DELETE_ORDER,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const importOrders = (importedData) => ({
  type: IMPORT_ORDERS,
  payload: importedData,
});
