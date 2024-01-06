import {
  ADD_DELIVERYCHALLAN,
  GET_DELIVERYCHALLANS,
  UPDATE_DELIVERYCHALLAN,
  DELETE_DELIVERYCHALLAN,
  SEARCH_DELIVERYCHALLANS,
  IMPORT_DELIVERYCHALLANS
} from './types';

const initialState = {
  deliverychallans: [],
  searchQuery: '',
};

const deliverychallanReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DELIVERYCHALLAN:
      return {
        ...state,
        deliverychallans: [...state.deliverychallans, action.payload],
      };
    case GET_DELIVERYCHALLANS:
      return {
        ...state,
        deliverychallans: action.payload,
      };
    case UPDATE_DELIVERYCHALLAN:
      return {
        ...state,
        deliverychallans: state.deliverychallans.map((deliverychallan) =>
          deliverychallan._id === action.payload._id ? action.payload : deliverychallan
        ),
      };
    case DELETE_DELIVERYCHALLAN:
      return {
        ...state,
        deliverychallans: state.deliverychallans.filter((deliverychallan) => deliverychallan._id !== action.payload._id),
      };
    case SEARCH_DELIVERYCHALLANS:
      return {
        ...state,
        searchQuery: action.payload,
      };
      case IMPORT_DELIVERYCHALLANS:
        return {
          ...state,
          deliverychallans: [...state.deliverychallans, ...action.payload],
        };
    default:
      return state;
  }
};

export default deliverychallanReducer;
