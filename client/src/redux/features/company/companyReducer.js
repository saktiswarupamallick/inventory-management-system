const initialState = {
  company: null,
  error: null,
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_COMPANY_SUCCESS':
    case 'CREATE_COMPANY_SUCCESS':
    case 'UPDATE_COMPANY_SUCCESS':
      return {
        ...state,
        company: action.payload,
        error: null,
      };
    case 'GET_COMPANY_FAILURE':
    case 'CREATE_COMPANY_FAILURE':
    case 'UPDATE_COMPANY_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default companyReducer;
