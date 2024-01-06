import axios from 'axios';
import {
  ADD_CREDITNOTE,
  GET_CREDITNOTES,
  UPDATE_CREDITNOTE,
  DELETE_CREDITNOTE,
  IMPORT_CREDITNOTES
} from './types';

const apiUrl = 'http://localhost:9000/credit-notes/creditnotes';

export const addCreditnote = (creditnoteData) => async (dispatch) => {
  try {
    const response = await axios.post(apiUrl, creditnoteData);
    dispatch({
      type: ADD_CREDITNOTE,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getCreditnotes = () => async (dispatch) => {
  try {
    const response = await axios.get(apiUrl);
    dispatch({
      type: GET_CREDITNOTES,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateCreditnote = (id, creditnoteData) => async (dispatch) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, creditnoteData);
    dispatch({
      type: UPDATE_CREDITNOTE,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteCreditnote = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    dispatch({
      type: DELETE_CREDITNOTE,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const importCreditnotes = (importedData) => ({
  type: IMPORT_CREDITNOTES,
  payload: importedData,
});
