import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filtervendorSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {
      const { products, search } = action.payload;
      const tempProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) 
      
      );

      state.filteredProducts = tempProducts;
    },
  },
});

export const { FILTER_PRODUCTS } = filtervendorSlice.actions;

export const selectFilteredPoducts = (state) => state.filter.filteredProducts;

export default filtervendorSlice.reducer;