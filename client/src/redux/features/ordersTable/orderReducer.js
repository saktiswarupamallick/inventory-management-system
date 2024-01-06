import {
  ADD_ORDER,
  GET_ORDERS,
  UPDATE_ORDER,
  DELETE_ORDER,
  SEARCH_ORDERS,
  IMPORT_ORDERS
} from './types';

const initialState = {
  orders: [],
  searchQuery: '',
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ),
      };
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order._id !== action.payload._id),
      };
    case SEARCH_ORDERS:
      return {
        ...state,
        searchQuery: action.payload,
      };
      case IMPORT_ORDERS:
        return {
          ...state,
          orders: [...state.orders, ...action.payload],
        };
    default:
      return state;
  }
};

export default orderReducer;
