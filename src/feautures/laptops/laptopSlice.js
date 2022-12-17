import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { database } from '../../firebaseConfig';
import { getDocs, collection } from "firebase/firestore";

const initialState = {
    laptops: [],
    currentLaptop: [],
    isLoading: false
};

export const getLaptops = createAsyncThunk('data/getData', async () => {
    try {
        const data = await getDocs(collection(database, 'laptops'));
        const result = data.docs.map((item) => {
            return { ...item.data(), id: item.id }
        });
        return result;
    } catch (error) {
        alert(error.message);
    }
});

export const laptopSlice = createSlice({
    name: 'laptops',
    initialState,
    reducers: {
        getCurrentLaptop: (state, action) => {
            state.currentLaptop = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getLaptops.pending, (state) => {
            state.isLoading = false;
        })
            .addCase(getLaptops.fulfilled, (state, action) => {
                state.isLoading = true;
                state.laptops = action.payload;
            })
            .addCase(getLaptops.rejected, (state, action) => {
                state.isLoading = false;
                alert(action.payload);
            })
    }
});

export const { getCurrentLaptop } = laptopSlice.actions;

export default laptopSlice.reducer;