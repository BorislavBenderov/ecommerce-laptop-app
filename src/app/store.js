import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../feautures/user/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
    }
})