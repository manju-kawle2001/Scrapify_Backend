import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Api from "../components/WebApi";
export const getCategory = createAsyncThunk("CategorySlice/getCategory",async ()=>{
  try{
     let response = await axios.get(Api.GetCategoryList);
     return response.data.categoryList;
  }
  catch(err){

  }
});
const slice = createSlice({
    name: "CategorySlice",
    initialState:{
        categoryList: [],
        isLoading: false,
        error: false
    },
    extraReducers: (builder)=>{
        builder.addCase(getCategory.pending,(state,action)=>{
            state.isLoading = true;
        }).addCase(getCategory.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.categoryList = action.payload;
        }).addCase(getCategory.rejected,(state,action)=>{
            state.error = "Oops! something went wrong..";
        })
    }
});

export const {removeProduct} = slice.actions;
export default slice.reducer;