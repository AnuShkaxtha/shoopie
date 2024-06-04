import { createSlice,PayloadAction } from "@reduxjs/toolkit";

// Interface for cart item
interface CartItem {
  id: number;
  name: string;
  price: number;
  qnty: number;
}

// Interface for initial state
interface CartState {
  cart: CartItem[];
  items: any[];
}

// storing cart item in local storage 
export const loadCartItemsFromStorage = (userId: string):CartItem[]=> {
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
const initialState : CartState= {
  cart: [],
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // for managing items state
    setItems: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
    },

    // for managing cart state
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = action.payload;
    },

    // adding items to cart 
    addToCart: (state,action: PayloadAction<{ id: number; count: number }>) => {
      const { id, count } = action.payload;
      const itemIndex = state.cart.findIndex((item) => item.id === id);
      const itemToAdd = state.items.find((item) => item.id === id);

      if (!itemToAdd) {
        // Handle case where item is not found in the items list
        console.error("Item not found");
        return;
      }

      if (itemIndex >= 0) {
        // Item exists in cart
        state.cart[itemIndex].qnty += count;
      } else {
        // Item does not exist in cart, add it
        state.cart.push({ ...itemToAdd, qnty: count });
      }
    },

    // removing single item from cart 
    removeSingleItems: (state, action:  PayloadAction<{ id: number }>) => {
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
    increaseCount: (state, action :PayloadAction<{ id: number }>) => {
      const itemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.cart[itemIndex].qnty += 1;
      }
    },
    decreaseCount: (state, action:  PayloadAction<{ id: number }>) => {
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
