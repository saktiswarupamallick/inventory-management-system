import { SEARCH_PURCHASES } from './types';

export const searchPurchases = (query) => {
  return {
    type: SEARCH_PURCHASES,
    payload: query,
  };
};
