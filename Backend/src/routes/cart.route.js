import express from "express";
import { addToCart, decreaseQuantity, fetchCart, increaseQuantity, removeCartItems, updateQunatity } from "../controllers/cart.controller.js";


const cartRouter = express.Router();

cartRouter.post("/addToCart",addToCart);
cartRouter.get("/fetchCart/:userId",fetchCart);
cartRouter.delete("/removeCartItems",removeCartItems);
cartRouter.put("/increaseQuantity",increaseQuantity);
cartRouter.put("/decreseQuantity",decreaseQuantity);
cartRouter.put("/updateQunatity", updateQunatity);
export default cartRouter;