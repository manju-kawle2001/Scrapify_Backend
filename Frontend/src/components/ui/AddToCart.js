import { useContext } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../App";
import { addProductToCart, getCartItems } from "../../redux-config/CartItemsSlice";


function AddToCart({ productId, margin, onClick }) {
    const dispatch = useDispatch();
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const fetchCartItems = () => {
        try {
            dispatch(getCartItems(user._id));
        } catch (error) {
            console.log("Error Getting product to cart:", error);
        }
    };

    const handleAddToCart = async () => {
        try {
            if (!user) {
                // navigate("/");
            }
            await dispatch(addProductToCart({ productId, userId: user._id }));

            fetchCartItems();
            toast.success("Product successfully added to cart!");
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    };
    return <>

        <Link to="#" className={`${margin} font-oswald flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300`}
            onClick={(e) => {
                e.preventDefault();
                handleAddToCart();
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeWidth="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to cart
        </Link >
    </>
}

export default AddToCart;
