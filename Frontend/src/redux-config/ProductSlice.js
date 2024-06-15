import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Api from "../components/WebApi";
export const getProduct = createAsyncThunk("ProductSlice/getProduct", async () => {
    try {
        let response = await axios.get(Api.GetAllProduct);
        return response.data.product;
    }
    catch (err) {

    }
});
const slice = createSlice({
    name: "ProductSlice",
    initialState: {
        productList: [],
        isLoading: false,
        error: false
    },
    reducers: {
        removeProductById: () => {
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProduct.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productList = action.payload;
        }).addCase(getProduct.rejected, (state, action) => {
            state.error = "Oops! something went wrong..";
        })
    }
});

export const { removeProduct } = slice.actions;
export default slice.reducer;