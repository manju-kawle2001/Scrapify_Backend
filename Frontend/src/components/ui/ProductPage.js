import SlRating from '@shoelace-style/shoelace/dist/react/rating';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AddToCart from './AddToCart.js';
import ImageMagnifier from './ImageMagnifier.tsx';
import UserReview from './UserReview';
import "./css/ProductPage.css";

const ProductPage = () => {
    const { state } = useLocation();
    const [image, setImage] = useState(state.thumbnail);

    const calculateAverageRating = (ratings) => {
        if (ratings.length === 0) {
            return 0;
        }
        const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);
        const average = (totalRating / (ratings.length * 5)) * 5; // Scale the average to a max of 5
        return average;
    };

    const averageRating = calculateAverageRating(state.rating);

    return (
        <>
            <div className="flex justify-center items-center mt-10   ">
                <div className=" lg:w-4/5 lg:h-3/4	 image-container  bg-white shadow-lg rounded-lg overflow-hidden ">
                    <div className="grid grid-cols-1 sm:grid-cols-2  mt-2  ">
                        <div className=" lg:pt-8 lg:pr-6 p-4 rounded lg:mr-20">
                            <ImageMagnifier src={image} width={'280px'} height={'340px'} />
                            <div className='p-0'>
                                <div className=" grid grid-cols-4 gap-4 p-4  border-gray-200 ">
                                    {state.images.map((image, index) => (
                                        <img className="p-2 shadow-sm cursor-pointer rounded-xl hover:opacity-40 h-[90px] w-[90px]" key={index} src={image} onClick={() => { setImage(image) }} alt={`Product Image ${index}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="lg:mt-8 p-4  lg:ml-5 lg:pt-8 lg:pr-6 font-oswald">
                            <h1 className="text-xl font-semibold mb-2">{state.productName}</h1>

                            <p className="text-[#272727] font-semibold opacity-75 text-lg mb-2">Category :  {state.category}</p>

                            <div className=''>
                                <p class="text-lg font-semibold text-gray-800 font-oswald ">Product Description</p>
                            </div>
                            <p class="text-sm text-gray-700 mb-3 leading-relaxed font-oswald">
                                {state.description}
                            </p>
                            <SlRating label="Rating" precision={0.5} value={averageRating} />
                            <div className="flex items-center mb-4">
                                <p>
                                    <span className="text-2xl font-oswald font-bold text-slate-900">Rs {state.price}/- Only</span>
                                    <span className="text-sm font-oswald text-slate-900 line-through">Rs {state.price + 102.23}  /- Only</span>
                                </p>
                            </div>
                            <div className='flex'>
                                <AddToCart margin={"ml-1"} productId={state._id} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' mt-5 mb-5 font-oswald '>
                <p className='font-semibold mt-2 lg:ml-36 text-lg ml-12 md:ml-10 '>User Reviews -</p>
                <UserReview />
            </div>

        </>
    );
};

export default ProductPage;
