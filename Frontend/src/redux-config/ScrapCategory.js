import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Api from "../components/WebApi";
export const getScrapCategorySlice = createAsyncThunk("ScrapCategorySlice/getScrapCategorySlice", async () => {
    try {
        let response = await axios.get(Api.GetScrapCategory);
        return response.data.categoryList;
    }
    catch (err) {
        // log
    }
});
const slice = createSlice({
    name: "ScrapCategorySlice",
    initialState: {
        scrapcategoryList: [],
        isLoading: false,
        error: false
    },
    extraReducers: (builder) => {
        builder.addCase(getScrapCategorySlice.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getScrapCategorySlice.fulfilled, (state, action) => {
            state.isLoading = false;
            state.scrapcategoryList = action.payload;
        }).addCase(getScrapCategorySlice.rejected, (state, action) => {
            state.error = "Oops! something went wrong..";
        })
    }
});

export const { removeProduct } = slice.actions;
export default slice.reducer;