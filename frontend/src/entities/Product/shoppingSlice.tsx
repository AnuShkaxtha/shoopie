import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store/store';
import { fetchItemsByCategoryApi, fetchItemsBySubCategoryApi } from './api/productApi';
import { FilterCategory, FilterTrends, PriceRanges, ShoppingState } from './model/productModel';

const initialState: ShoppingState = {
  items: [],
  searchInput: "",
  filterTrends: {
    newArrivals: false,
    bestSellers: false,
    topRated: false,
  },
  priceRanges: {
    $0_500: false,
    $500_1000: false,
    $1000_2500: false,
    $2500_4000: false,
    $4000_more: false,
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
    return await fetchItemsByCategoryApi(categoryId);
  }
);

export const fetchItemsBySubCategory = (categoryId: string, subCategoryId: string): AppThunk => async (dispatch) => {
  try {
    const items = await fetchItemsBySubCategoryApi(categoryId, subCategoryId);
    dispatch(setItems(items));
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
        $0_500: false,
        $500_1000: false,
        $1000_2500: false,
        $2500_4000: false,
        $4000_more: false,
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
