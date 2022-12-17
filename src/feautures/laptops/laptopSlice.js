import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    laptops: [],
    currentLaptop: [],
};

export const laptopSlice = createSlice({
    name: 'laptops',
    initialState,
    reducers: {
        getCurrentLaptop: (state, action) => {
            state.currentLaptop = action.payload;
        },
        getAllLaptops: (state, action) => {
            state.laptops = action.payload
        }
    }
});

export const { getAllLaptops, getCurrentLaptop } = laptopSlice.actions;

export default laptopSlice.reducer;