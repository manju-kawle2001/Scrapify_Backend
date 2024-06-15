import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { UserContext } from '../../App';
import Api from "../WebApi";
import "./css/ProductPage.css";
function QuantityButton({ productId, existQuantity }) {
    const [quantity, setQuantity] = useState(existQuantity || 1);
    const { user, setUser } = useContext(UserContext);
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        if (quantity < 99) {
            setQuantity(quantity + 1);
        }
    };


    useEffect(() => {
        let timeoutId;
        const updateQuantity = async () => {
            try {


                if (!user) {
                    return;
                }
                const response = await axios.put(Api.UpdateQunatity, { quantity, productId, userId: user._id });
                console.log('Quantity updated on server:', response.data);
            } catch (error) {
                console.error('Error updating quantity:', error);
            }
        };

        const handleQuantityChange = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if (quantity !== 1) {
                    updateQuantity();
                }
            }, 2000);
        };
        handleQuantityChange();
        return () => {
            clearTimeout(timeoutId);
        };
    }, [quantity]);


    return (
        <div className=" quantity-container flex items-center space-x-2  w-36 h-10">
            <button
                className="px-2 py-1  h-full w-12 decrease-button"
                onClick={decreaseQuantity}>
                <FaMinusCircle className='text-2xl float-left' />
            </button>
            <span className="px-3 py-1   text-1xl"> {quantity} </span>
            <button
                className=" px-2 py-1  h-full w-12  increase-button "
                onClick={increaseQuantity}
            > <FaPlusCircle className='text-2xl float-right' />
            </button>
        </div>
    );
};

export default QuantityButton;
