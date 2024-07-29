
export interface FilterTrends {
    newArrivals: boolean;
    bestSellers: boolean;
    topRated: boolean;
  }
  
  export interface PriceRanges {
    $0_500: boolean;
    $500_1000: boolean;
    $1000_2500: boolean;
    $2500_4000: boolean;
    $4000_more: boolean;
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
  