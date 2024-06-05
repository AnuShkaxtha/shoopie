import { createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface FilterTrends {
  newArrivals: boolean;
    bestSellers: boolean;
    topRated: boolean;
}

export interface PriceRanges {
  range0_300: boolean;
    range300_600: boolean;
    range600_1000: boolean;
    range1000_4000: boolean;
}

// main iterface for initial state
interface ShoppingState{
  items: any[];
  searchInput: string;
  filterTrends:  FilterTrends;
  priceRanges: PriceRanges;
  allItem: boolean;
}

const initialState: ShoppingState = {
  items: [],
  //initial state of filters
  searchInput: "",
  filterTrends: {
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
    // for managing items state
    setItems: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
    },
    // to set seach input value 
    setSearchInput: (state, action:PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
    // to set item based on trend
    toggleTrendFilter: (state, action:PayloadAction<keyof FilterTrends>) => {
      state.filterTrends[action.payload] = !state.filterTrends[action.payload];
    },

    togglePriceFilter: (state, action:PayloadAction<keyof PriceRanges>) => {
      state.priceRanges[action.payload] = !state.priceRanges[action.payload];
    },
    // action to clear all filter 
    clearFilters: (state) => {
      state.filterTrends = {
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
  toggleTrendFilter,
  togglePriceFilter,
  clearFilters,
  toggleAllItem,
} = shoppingSlice.actions;

export default shoppingSlice.reducer;
