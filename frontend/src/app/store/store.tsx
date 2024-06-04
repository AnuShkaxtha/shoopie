import { configureStore } from "@reduxjs/toolkit";
// importing slices
import cartReducer from "./index";
import shoppingSlice from "./shoppingSlice";

// Define the root state and dispatch types
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    shopping: shoppingSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
