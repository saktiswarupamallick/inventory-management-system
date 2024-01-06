import { SEARCH_DELIVERYCHALLANS } from './types';

export const searchOrders = (query) => {
  return {
    type: SEARCH_DELIVERYCHALLANS,
    payload: query,
  };
};
