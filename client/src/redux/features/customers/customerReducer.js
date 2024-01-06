import {
  ADD_CUSTOMER,
  GET_CUSTOMERS,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
  IMPORT_CUSTOMERS,
  SEARCH_CUSTOMERS
} from './customerActionTypes';

const initialState = {  
  customers: [],
  searchQuery: '',
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CUSTOMER:
      return {
        ...state,
        customers: [...state.customers, action.payload],
      };
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
      };
    case UPDATE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.map((customer) =>
          customer._id === action.payload._id ? action.payload : customer
        ),
      };
    case DELETE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter((customer) => customer._id !== action.payload._id),
      };
    case SEARCH_CUSTOMERS:
      return {
        ...state,
        searchQuery: action.payload,
      };
      case IMPORT_CUSTOMERS:
        return {
          ...state,
          customers: [...state.customers, ...action.payload],
        };
    default:
      return state;
  }
};

export default customerReducer;
