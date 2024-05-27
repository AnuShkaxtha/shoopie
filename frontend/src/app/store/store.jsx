import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./index"

export const store = configureStore({
    reducer:{
        cart: cartReducer,
    }
})
