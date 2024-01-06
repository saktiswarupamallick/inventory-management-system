import { SEARCH_ORDERS } from './types';

export const searchOrders = (query) => {
  return {
    type: SEARCH_ORDERS,
    payload: query,
  };
};
