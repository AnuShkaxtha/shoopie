import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Thunks for asynchronous operations
export const fetchItems = createAsyncThunk("cart/fetchItems", async () => {
  const response = await fetch("http://localhost:1337/api/items?populate=image", { method: "GET" });
  const itemsJson = await response.json();
  return itemsJson.data;
});

export const fetchItemById = createAsyncThunk("cart/fetchItemById", async (itemId) => {
  const response = await fetch(`http://localhost:1337/api/items/${itemId}?populate=image`, { method: "GET" });
  const itemJson = await response.json();
  return itemJson.data;
});

// storing cart item in local storage 
export const loadCartItemsFromStorage = (userId) => {
  try {
    const savedCart = localStorage.getItem(`cart_${userId}`);
    if (savedCart) {
      // coverting json string into java script object 
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Error loading cart items from local storage:', error);
  }
  return [];
};

// Initial state with empty cart and items arrays
const initialState = {
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
    // for managing items state
    setItems: (state, action) => {
      state.items = action.payload;
    },

    // for managing cart state
    setCart: (state, action) => {
      state.cart = action.payload;
    },

    // adding items to cart 
    addToCart: (state, action) => {
      const { id, count } = action.payload;
      const itemIndex = state.cart.findIndex(item => item.id === id);
      // item exist in cart 
      if (itemIndex >= 0) {
        state.cart[itemIndex].qnty += count;
      } else {
        state.cart.push({ ...action.payload, qnty: count });
      }
    },

    // removing single item from cart 
    removeSingleItems: (state, action) => {
      const itemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0 && state.cart[itemIndex].qnty > 1) {
        state.cart[itemIndex].qnty -= 1;
      } 
      // remove item from cart 
      else {
        state.cart = state.cart.filter(item => item.id !== action.payload.id);
      }
    },

    // clearing whole cart 
    clearCart: (state) => {
      state.cart = [];
    },

    // counting  item count in cart 
    increaseCount: (state, action) => {
      const itemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.cart[itemIndex].qnty += 1;
      }
    },
    decreaseCount: (state, action) => {
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
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchItemById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.item = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
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
