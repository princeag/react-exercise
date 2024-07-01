import { createSlice } from "@reduxjs/toolkit";
import { addToCart } from "../cart/cartSlice";

const initialState = {
    products: [
        {
            id: 1,
            title: 'Apple iphone 14',
            src: "https://loremflickr.com/320/240/apple",
            price: 41000,
            brand: 'Apple inc.',
            quantity: 5, // available qty
            remainingQuantity: 5
        },
        {
            id: 2,
            title: 'Apple iphone 14 pro',
            src: "https://loremflickr.com/320/240/samsung",
            price: 49000,
            brand: 'Apple inc.',
            quantity: 5, // available qty
            remainingQuantity: 5
        },
        {
            id: 3,
            title: 'Apple iphone 14x',
            src: "https://loremflickr.com/320/240/hp",
            price: 61000,
            brand: 'Apple inc.',
            quantity: 5, // available qty
            remainingQuantity: 5
        }
    ]
};


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        buyProduct: (state, action) => {
            // console.log('buying a product')
            const newProducts = []
            state.products.map((product, i) => {
                if (product.id === action.payload.id) {
                    product.remainingQuantity -= action.payload.qty;
                }
                newProducts.push(product)
            })
            state = newProducts
        },
        restockProduct: (state, action) => {
            const newProducts = []
            state.products.map(product => {
                if (product.id === action.payload.id)
                    product.remainingQuantity++
                newProducts.push(product)
            })

            state = newProducts
        }
    }
})

export default productsSlice.reducer;
export const { buyProduct, restockProduct } = productsSlice.actions