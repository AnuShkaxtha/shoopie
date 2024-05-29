// store/shoppingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  searchInput: "",
  filterCategories: {
    newArrivals: false,
    bestSellers: false,
    topRated: false,
  },
  priceRanges: {
    range0_300: false,
    range300_600: false,
    range600_1000: false,
    range1000_4000: false,
  },
  allItem: false,
};

export const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    toggleCategoryFilter: (state, action) => {
      state.filterCategories[action.payload] = !state.filterCategories[action.payload];
    },
    togglePriceFilter: (state, action) => {
      state.priceRanges[action.payload] = !state.priceRanges[action.payload];
    },
    clearFilters: (state) => {
      state.filterCategories = {
        newArrivals: false,
        bestSellers: false,
        topRated: false,
      };
      state.priceRanges = {
        range0_300: false,
        range300_600: false,
        range600_1000: false,
        range1000_4000: false,
      };
      state.searchInput = "";
      state.allItem = false;
    },
    toggleAllItem: (state) => {
      state.allItem = !state.allItem;
    },
  },
});

export const {
  setItems,
  setSearchInput,
  toggleCategoryFilter,
  togglePriceFilter,
  clearFilters,
  toggleAllItem,
} = shoppingSlice.actions;

export default shoppingSlice.reducer;
