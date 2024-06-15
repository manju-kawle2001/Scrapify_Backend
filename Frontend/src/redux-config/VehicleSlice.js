import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Api from "../components/WebApi";
export const getVehicleList = createAsyncThunk("VehicleSlice/getVehicle", async () => {
    try {
        let response = await axios.get(Api.GetVehicle);
        return response.data.vehicleList;
    }
    catch (err) {

    }
});
const slice = createSlice({
    name: "VehicleSlice",
    initialState: {
        vehicleList: [],
        isLoading: false,
        error: false
    },
    extraReducers: (builder) => {
        builder.addCase(getVehicleList.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getVehicleList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.vehicleList = action.payload;
        }).addCase(getVehicleList.rejected, (state, action) => {
            state.error = "Oops! something went wrong..";
        })
    }
});


export default slice.reducer;