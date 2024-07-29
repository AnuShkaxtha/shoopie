import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import cartReducer from "../../entities/Cart/index";
import shoppingSlice from "../../entities/Product/shoppingSlice";
import adminAuthReducer from "../../entities/Admin/adminAuthSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,  // manages states related to cart 
    shopping: shoppingSlice,  // manages state related to product browsing and selection
    adminAuth: adminAuthReducer, // manages state related to admin autheticaton
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>; // entire state of redux
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
