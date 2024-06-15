import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Api from "../components/WebApi";


export const getCartItems = createAsyncThunk(
    "cartItemsSlice/getCartItems",
    async (userId) => {
        try {
            const response = await axios.get(`${Api.GetCartItems}/${userId}`);
            console.log("In slice  : ", response.data.cart[0].cartItems);
            return response.data.cart[0].cartItems
        } catch (error) {
            console.error("Error gatting product to cart:", error);
            throw error;
        }
    }
);


export const addProductToCart = createAsyncThunk(
    "cartItemsSlice/addProductToCart",
    async ({ productId, userId }) => {
        try {
            console.log(productId, userId);
            const response = await axios.post(Api.AddToCart, { productId, userId });
            return response.data;
        } catch (error) {
            console.log(error.response.status);
            return error;
        }
    }
);


export const removeProductFromCart = createAsyncThunk(
    "cartItemsSlice/removeProductFromCart",
    async ({ userId, productId }) => {
        try {
            console.log(userId, productId);
            const response = await axios.delete(Api.RemoveProductItem, {
                data: { productId: productId, userId: userId }
            });
            return response.data;
        } catch (error) {
            console.error("Error removing product from cart:", error);
            throw error;
        }
    }
);


const cartItemsSlice = createSlice({
    name: "cartItemsSlice",
    initialState: {
        cartItems: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setCartItems(state, action) {
            state.cartItems = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProductToCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Error adding product to cart";
            })
            .addCase(removeProductFromCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(removeProductFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(removeProductFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Error removing product from cart";
            })

            .addCase(getCartItems.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.cartItems = action.payload;
            })
            .addCase(getCartItems.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Error Gatting product to cart";
            })
    },
});


export const { setCartItems } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
