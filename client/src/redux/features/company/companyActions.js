import axios from 'axios';

// Action to fetch company details
export const getCompanyDetails = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:9000/api/company'); // Adjust the API endpoint as needed
    dispatch({
      type: 'GET_COMPANY_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_COMPANY_FAILURE',
      payload: error.message,
    });
  }
};

// Action to create a new company
export const createCompany = (companyData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:9000/api/company', companyData);
    dispatch({
      type: 'CREATE_COMPANY_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'CREATE_COMPANY_FAILURE',
      payload: error.message,
    });
  }
};

// Action to update company details
export const updateCompany = (companyData) => async (dispatch) => {
  try {
    const response = await axios.put('http://localhost:9000/api/company', companyData);
    dispatch({
      type: 'UPDATE_COMPANY_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'UPDATE_COMPANY_FAILURE',
      payload: error.message,
    });
  }
};
