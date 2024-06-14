// src/features/shopping/shoppingModels.ts

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
  export interface ShoppingState {
    items: any[];
    searchInput: string;
    filterTrends: FilterTrends;
    priceRanges: PriceRanges;
    allItem: boolean;
    filterCategory: FilterCategory;
  }
  