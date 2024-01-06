import {
    ADD_PURCHASE,
    GET_PURCHASES,
    UPDATE_PURCHASE,
    DELETE_PURCHASE,
   SEARCH_PURCHASES
  } from './types';
  
  const initialState = {
    purchases: [],
    searchQuery: '',
  };
  
  const purchaseReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_PURCHASE:
        return {
          ...state,
          purchases: [...state.purchases, action.payload],
        };
      case GET_PURCHASES:
        return {
          ...state,
          purchases: action.payload,
        };
      case UPDATE_PURCHASE:
        return {
          ...state,
          purchases: state.purchases.map((purchase) =>
            purchase._id === action.payload._id ? action.payload : purchase
          ),
        };
      case DELETE_PURCHASE:
        return {
          ...state,
          purchases: state.purchases.filter((purchase) => purchase._id !== action.payload._id),
        };
        case SEARCH_PURCHASES:
      return {
        ...state,
        searchQuery: action.payload,
      };
      default:
        return state;
    }
  };
  
  export default purchaseReducer;
  