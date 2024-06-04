import { createSlice,PayloadAction} from "@reduxjs/toolkit";

// Define the shape of the state
interface ShoppingState {
  items: any[];
  searchInput: string;
  filterCategories: {
    newArrivals: boolean;
    bestSellers: boolean;
    topRated: boolean;
  };
  priceRanges: {
    range0_300: boolean;
    range300_600: boolean;
    range600_1000: boolean;
    range1000_4000: boolean;
  };
  allItem: boolean;
}

//initial state
const initialState: ShoppingState = {
  items: [],
  //initial state of filters
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
    // for managing items state
    setItems: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
    },
    // to set seach input value 
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
    // to set item based on category 
    toggleCategoryFilter: (state, action: PayloadAction<keyof ShoppingState["filterCategories"]>) => {
      state.filterCategories[action.payload] = !state.filterCategories[action.payload];
    },

    togglePriceFilter: (state, action: PayloadAction<keyof ShoppingState["priceRanges"]>) => {
      state.priceRanges[action.payload] = !state.priceRanges[action.payload];
    },
    // action to clear all filter 
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
