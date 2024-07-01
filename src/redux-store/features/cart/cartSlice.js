import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: {
        count: 0,
        cartValue: 0.00,
        items: []
    }
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newCartItems = []
            let itemsFound = false;
            let totalCartItemQty = 0;
            let totalCartValue = state.cart.cartValue;
            console.log(action.payload.product.price)

            state.cart.items.map(item => {
                if (item.id === action.payload.product.id) {
                    item.quantity += action.payload.qty
                    itemsFound = true;
                    totalCartValue += action.payload.qty * action.payload.product.price;
                }
                totalCartItemQty += item.quantity;
                newCartItems.push(item)
            })

            if (!itemsFound) {
                const item = { id: action.payload.product.id, quantity: action.payload.qty }
                totalCartItemQty += item.quantity;
                totalCartValue += item.quantity * action.payload.product.price;
                newCartItems.push(item)
            }

            state.cart.items = newCartItems
            console.log(totalCartItemQty, action)
            state.cart.count = totalCartItemQty
            state.cart.cartValue = totalCartValue
        },
        removeFromCart: (state, action) => {
            const newItems = []
            var totalCartValue = state.cart.cartValue
            state.cart.items.map(item => {
                if (item.id === action.payload.product.id) {
                    item.quantity -= action.payload.qty
                    state.cart.count -= action.payload.qty
                    totalCartValue -= action.payload.qty * action.payload.product.price
                }

                if (item.quantity === 0) {
                    return;
                }
                newItems.push(item)
            })

            state.cart.items = newItems
            state.cart.cartValue = totalCartValue
        }
    }
})

export default cartSlice.reducer
export const { addToCart, removeFromCart } = cartSlice.actions