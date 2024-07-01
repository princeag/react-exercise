import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartReducer from '../features/cart/cartSlice'

const createStore = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer
    }
})

export default createStore;
