import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../feautures/user/userSlice';
import laptopReducer from '../feautures/laptops/laptopSlice';
import cartReducer from '../feautures/cart/cartSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        laptops: laptopReducer,
        cart: cartReducer
    }
})