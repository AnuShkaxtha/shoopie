import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState,AppThunk } from './store';

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

export interface FilterCategory {
  womens: boolean;
  mens: boolean;
  kids: boolean;
  beauty: boolean;
  home: boolean;
}

// main interface for initial state
interface ShoppingState {
  items: any[];
  searchInput: string;
  filterTrends: FilterTrends;
  priceRanges: PriceRanges;
  allItem: boolean;
  filterCategory: FilterCategory;
}

const initialState: ShoppingState = {
  items: [],
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
  filterCategory: {
    womens: false,
    mens: false,
    kids: false,
    beauty: false,
    home: false,
  },
};

export const fetchItemsByCategory = createAsyncThunk(
  'shopping/fetchItemsByCategory',
  async (categoryId: string) => {
    const response = await fetch(`http://localhost:1337/api/items?filters[category]=${categoryId}&populate=image`, { method: 'GET' });
    const itemsJson = await response.json();
    setItems(itemsJson.data);
    return itemsJson.data  // Adjust based on your API response structure
  }
);
export const fetchItemsBySubCategory = (categoryId:string,subCategoryId: string): AppThunk => async (dispatch) => {
  try {
    // http://localhost:1337/api/items?filters[sub_category]=2&filters[category]=2
    const response = await fetch(`http://localhost:1337/api/items?filters[sub_category]=${subCategoryId}&filters[category]=${categoryId}&populate=image`, { method: "GET" });
    
    const items = await response.json();
    console.log(items)
    
    dispatch(setItems(items.data));
  } catch (error) {
    console.error('Error fetching items by subcategory:', error);
  }
};

export const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    // for managing items state
    setItems: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
    },
    // to set search input value
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
    // to set item based on trend
    toggleTrendFilter: (state, action: PayloadAction<keyof FilterTrends>) => {
      state.filterTrends[action.payload] = !state.filterTrends[action.payload];
    },
    togglePriceFilter: (state, action: PayloadAction<keyof PriceRanges>) => {
      state.priceRanges[action.payload] = !state.priceRanges[action.payload];
    },
    toggleCategoryFilter: (state, action: PayloadAction<keyof FilterCategory>) => {
      state.filterCategory[action.payload] = !state.filterCategory[action.payload];
    },
    // action to clear all filters
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
      state.filterCategory = {
        womens: false,
        mens: false,
        kids: false,
        beauty: false,
        home: false,
      };
      state.searchInput = "";
      state.allItem = false;
    },
    toggleAllItem: (state) => {
      state.allItem = !state.allItem;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItemsByCategory.fulfilled, (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
    });
  },
});

export const {
  setItems,
  setSearchInput,
  toggleTrendFilter,
  togglePriceFilter,
  toggleCategoryFilter,
  clearFilters,
  toggleAllItem,
} = shoppingSlice.actions;

export default shoppingSlice.reducer;
