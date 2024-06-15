import React, { useContext, useEffect, useState } from "react";
import { MdCurrencyRupee } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { getCartItems, removeProductFromCart } from "../../redux-config/CartItemsSlice";
import ProductCard from "./ProductCard";
import QuantityButton from "./QuantityButton";
import svg from './img/icons8-add-shopping-cart.gif';

const ProductShoppingPage = () => {
    const [productPrice, setProductPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [productDiscount, setProductDiscount] = useState(0);

    const dispatch = useDispatch();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cartItems);

    const fetchCartItems = async () => {
        try {
            if (!user) return;

            await dispatch(getCartItems(user._id));
        } catch (error) {
            console.log("Error Getting product to cart:", error);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, [user, dispatch]);

    useEffect(() => {
        if (!cart.cartItems || cart.cartItems.length === 0) {
            setProductPrice(0);
            setProductDiscount(0);
            setTotalPrice(0);
            return;
        }

        const totalPrice = cart.cartItems.reduce((total, product) => {
            const price = product?.productId?.price || 0;
            const discount = product?.productId?.discountPercentage || 0;
            return total + price;
        }, 0);

        const totalDiscount = cart.cartItems.reduce((total, product) => {
            const discount = product?.productId?.discountPercentage || 0;
            return total + discount;
        }, 0);

        setProductPrice(totalPrice);
        setProductDiscount(totalDiscount);
        setTotalPrice(totalPrice - totalDiscount); // Calculate total price after discount
    }, [cart.cartItems]);

    const handleRemoveFromCart = async (productId) => {
        try {
            await dispatch(removeProductFromCart({ productId, userId: user._id }));
            await fetchCartItems();
        } catch (error) {
            console.log("Error removing product from cart:", error);
        }
    };

    const handlePlaceOrder = () => {
        navigate('/updateshippingaddress');
    };

    return (
        <>
            <div className="text-slate-700 font-oswald font-bold text-2xl text-center m-5">Offer By One Get Free Hurry Up Todoay Last Houre</div>
            <div>
                {cart.cartItems && cart.cartItems.length > 0 ? (
                    <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                        <div className="px-4 pt-8">
                            <div className="space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                                {cart.cartItems.map((product, index) => (
                                    <div className="flex flex-col rounded-lg bg-white sm:flex-row" key={index}>
                                        <img className="m-2 h-24 w-24 rounded-md border object-cover object-center" src={`http://localhost:8000/images/${product?.productId?.thumbnail}`} alt="Thumbnail" />
                                        <div className="flex w-full flex-col px-4 py-4">
                                            <span className="font-semibold">{product?.productId?.productName}</span>
                                            <p className="text-lg font-bold flex justify-start items-center"><MdCurrencyRupee />{product?.productId?.price}/- only</p>
                                            <div className="mt-1 flex justify-between items-center w-full">
                                                <p className="text-lg font-bold">Quantity</p>
                                                <QuantityButton existQuantity={product.quantity} />
                                            </div>
                                            <button className="mt-2 ml-auto px-2 py-2 text-xl bg-red-500 text-white rounded-lg hover:bg-red-600" onClick={() => handleRemoveFromCart(product?.productId?._id)}><RiDeleteBin7Fill /></button>
                                        </div>
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 pt-2 lg:mt-0">
                            <div className="mt-3">
                                <div className="mt-6 border-t border-b py-2">
                                    <div className="flex items-center justify-between py-2">
                                        <p className="text-lg font-medium text-gray-900">Price ({cart.cartItems.length} items)</p>
                                        <p className="font-semibold text-gray-900"><MdCurrencyRupee />{productPrice.toFixed(2)}/-</p>
                                    </div>
                                    <hr />
                                    <div className="flex items-center justify-between py-2">
                                        <p className="text-lg font-medium text-gray-900">Discount</p>
                                        <p className="font-semibold text-gray-900"><MdCurrencyRupee />{productDiscount.toFixed(2)}/-</p>
                                    </div>
                                    <hr />
                                    <hr />
                                    <div className="mt-6 flex items-center justify-between">
                                        <p className="text-lg font-medium text-gray-900">Total Amount</p>
                                        <p className="text-2xl font-semibold text-gray-900"><MdCurrencyRupee />{totalPrice.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                            <button className={`mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white`} disabled={cart.cartItems.length === 0} onClick={handlePlaceOrder}>Place Order</button>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-96  flex justify-center items-center font-oswald text-lg">
                        <h2>No products added to cart.</h2>
                        <img src={svg} className="h-11 w-11" />
                    </div>
                )}
            </div>
            <div className="mt-4 text-xl text-center font-oswald font-lg">Featured Product</div>
            <div className="grid sm:place-items-center lg:grid-cols-4 lg:gap-5 pl-2 pr-2 sm:grid-cols-2 sm:gap-3 grid-cols-1 place-items-center ">
                <ProductCard />
            </div>
        </>
    );
};

export default ProductShoppingPage;
