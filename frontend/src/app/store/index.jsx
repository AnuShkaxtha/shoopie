import { createSlice } from "@reduxjs/toolkit";

// storing cart item in local storage 
export const loadCartItemsFromStorage = (userId) => {
  try {
    const savedCart = localStorage.getItem(`cart_${userId}`);
    if (savedCart) {
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
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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
      } else {
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
