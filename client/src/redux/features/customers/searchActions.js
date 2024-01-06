import { SEARCH_CUSTOMERS } from './customerActionTypes';

export const searchcustomers = (query) => {
  return {
    type: SEARCH_CUSTOMERS,
    payload: query,
  };
};
