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
