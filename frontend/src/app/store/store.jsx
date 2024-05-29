import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./index"
import shoppingSlice from "./shoppingSlice"

export const store = configureStore({
    reducer:{
        cart: cartReducer,
        shopping: shoppingSlice,
    }
})
