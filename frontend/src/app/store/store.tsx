import {configureStore} from "@reduxjs/toolkit"
// importing slices
import cartReducer from "./index"
import shoppingSlice from "./shoppingSlice"

export const store = configureStore({
    reducer:{
        cart: cartReducer,
        shopping: shoppingSlice,
    }
})

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;