import {
  ADD_CREDITNOTE,
  GET_CREDITNOTES,
  UPDATE_CREDITNOTE,
  DELETE_CREDITNOTE,
  SEARCH_CREDITNOTES,
  IMPORT_CREDITNOTES
} from './types';

const initialState = {
  creditnotes: [],
  searchQuery: '',
};

const creditnoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CREDITNOTE:
      return {
        ...state,
        creditnotes: [...state.creditnotes, action.payload],
      };
    case GET_CREDITNOTES:
      return {
        ...state,
        creditnotes: action.payload,
      };
    case UPDATE_CREDITNOTE:
      return {
        ...state,
        creditnotes: state.creditnotes.map((creditnote) =>
          creditnote._id === action.payload._id ? action.payload : creditnote
        ),
      };
    case DELETE_CREDITNOTE:
      return {
        ...state,
        creditnotes: state.creditnotes.filter((creditnote) => creditnote._id !== action.payload._id),
      };
    case SEARCH_CREDITNOTES:
      return {
        ...state,
        searchQuery: action.payload,
      };
      case IMPORT_CREDITNOTES:
        return {
          ...state,
          creditnotes: [...state.creditnotes, ...action.payload],
        };
    default:
      return state;
  }
};

export default creditnoteReducer;




