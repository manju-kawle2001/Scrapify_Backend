
import { configureStore } from "@reduxjs/toolkit";
import CartItemsSlice from "./CartItemsSlice";
import CategorySlice from './CategorySlice';
import ProductSlice from "./ProductSlice";
import ScrapCategorySlice from "./ScrapCategory";
import VehicleSlice from "./VehicleSlice";
export const Store = configureStore({
    reducer: {
        product: ProductSlice,
        category: CategorySlice,
        scrapcategory: ScrapCategorySlice,
        cartItems: CartItemsSlice,
        vehicle: VehicleSlice,
    }
})
