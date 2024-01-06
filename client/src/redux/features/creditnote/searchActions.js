import { SEARCH_CREDITNOTES } from './types';

export const searchCreditnotes = (query) => {
  return {
    type: SEARCH_CREDITNOTES,
    payload: query,
  };
};
