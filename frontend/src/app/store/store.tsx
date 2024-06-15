import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import cartReducer from "../../entities/Cart/index";
import shoppingSlice from "../../entities/Product/shoppingSlice";
import adminAuthReducer from "../../entities/Admin/adminAuthSlice"; // Import the adminAuth slice

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    shopping: shoppingSlice,
    adminAuth: adminAuthReducer, // Add adminAuth to the store
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
