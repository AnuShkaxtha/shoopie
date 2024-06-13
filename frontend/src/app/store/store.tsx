import {configureStore, ThunkAction, Action} from "@reduxjs/toolkit"
// importing slices
import cartReducer from "../../entities/Cart/index"
import shoppingSlice from "../../entities/Product/shoppingSlice"

export const store = configureStore({
    reducer:{
        cart: cartReducer,
        shopping: shoppingSlice,
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;









