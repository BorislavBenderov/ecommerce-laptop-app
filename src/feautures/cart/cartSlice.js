import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cart: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getCartItems: (state, action) => {
            state.cart = action.payload;
        }
    }
});

export const { getCartItems } = cartSlice.actions;

export default cartSlice.reducer;