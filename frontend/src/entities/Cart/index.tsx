import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { fetchItemsApi, fetchItemByIdApi } from "./api/cartApi";
import { CartItem, CartState, Item, ItemAttributes } from "./models/CartTypes";


// Thunks for asynchronous operations
export const fetchItems = createAsyncThunk("cart/fetchItems", async () => {
  return await fetchItemsApi();
});

export const fetchItemById = createAsyncThunk("cart/fetchItemById", async (itemId: number) => {
  return await fetchItemByIdApi(itemId);
});

// Storing cart item in local storage 
export const loadCartItemsFromStorage = (userId: string): CartItem[] => {
  try {
    const savedCart = localStorage.getItem(`cart_${userId}`);
    if (savedCart) {
      // Converting JSON string into JavaScript object 
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Error loading cart items from local storage:', error);
  }
  return [];
};

// Initial state with empty cart and items arrays
const initialState: CartState = {
  cart: [],
  items: [],
  item: null,
  status: 'idle',
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // For managing items state
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },

    // For managing cart state
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = action.payload;
    },

    // Adding items to cart 
    addToCart: (state, action: PayloadAction<{ id: number; count: number } & ItemAttributes>) => {
      const { id, count, ...attributes } = action.payload;
      console.log(attributes)
      const itemIndex = state.cart.findIndex(item => item.id === id);
      // Item exists in cart 
      if (itemIndex >= 0) {
        state.cart[itemIndex].qnty += count;
      } else {
        
        state.cart.push({ id, attributes, qnty: count });
      }
    },

    // Removing single item from cart 
    removeSingleItems: (state, action: PayloadAction<{ id: number }>) => {
      const itemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0 && state.cart[itemIndex].qnty > 1) {
        state.cart[itemIndex].qnty -= 1;
      } 
      // Remove item from cart 
      else {
        state.cart = state.cart.filter(item => item.id !== action.payload.id);
      }
    },

    // Clearing whole cart 
    clearCart: (state) => {
      state.cart = [];
    },

    // Counting item count in cart 
    increaseCount: (state, action: PayloadAction<{ id: number }>) => {
      const itemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.cart[itemIndex].qnty += 1;
      }
    },
    decreaseCount: (state, action: PayloadAction<{ id: number }>) => {
      const itemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0 && state.cart[itemIndex].qnty > 1) {
        state.cart[itemIndex].qnty -= 1;
      }
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchItemById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemById.fulfilled, (state, action: PayloadAction<Item>) => {
        state.status = 'succeeded';
        state.item = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const {
  setItems,
  setCart,
  addToCart,
  increaseCount,
  decreaseCount,
  removeSingleItems,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
