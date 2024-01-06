import axios from 'axios';
import {
  ADD_DELIVERYCHALLAN,
  GET_DELIVERYCHALLANS,
  UPDATE_DELIVERYCHALLAN,
  DELETE_DELIVERYCHALLAN,
  IMPORT_DELIVERYCHALLANS

} from './types';

const apiUrl = 'http://localhost:9000/api/deliverychallan/deliverychallans';

export const addDeliverychallan = (deliverychallanData) => async (dispatch) => {
  try {
    const response = await axios.post(apiUrl, deliverychallanData);
    dispatch({
      type: ADD_DELIVERYCHALLAN,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getDeliverychallans = () => async (dispatch) => {
  try {
    const response = await axios.get(apiUrl);
    dispatch({
      type: GET_DELIVERYCHALLANS,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateDeliverychallan = (id, deliverychallanData) => async (dispatch) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, deliverychallanData);
    dispatch({
      type: UPDATE_DELIVERYCHALLAN,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteDeliverychallan = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    dispatch({
      type: DELETE_DELIVERYCHALLAN,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const importDeliverychallans = (importedData) => ({
  type: IMPORT_DELIVERYCHALLANS,
  payload: importedData,
});
