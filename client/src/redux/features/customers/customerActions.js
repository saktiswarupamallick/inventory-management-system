import axios from 'axios';
import {
  ADD_CUSTOMER,
  GET_CUSTOMERS,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
  IMPORT_CUSTOMERS

} from './customerActionTypes';

const apiUrl = 'http://localhost:9000/api/customers';

export const addCustomer = (customerData) => async (dispatch) => {
  try {
    const response = await axios.post(apiUrl, customerData);
    dispatch({
      type: ADD_CUSTOMER,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getCustomers = () => async (dispatch) => {
  try {
    const response = await axios.get(apiUrl);
    dispatch({
      type: GET_CUSTOMERS,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateCustomer = (id, customerData) => async (dispatch) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, customerData);
    dispatch({
      type: UPDATE_CUSTOMER,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteCustomer = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    dispatch({
      type: DELETE_CUSTOMER,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const importCustomers = (importedData) => ({
  type: IMPORT_CUSTOMERS,
  payload: importedData,
});
