import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ImageMagnifier from './ImageMagnifier.tsx';
import "./css/ProductPage.css";

const UserScrapDetails = () => {
    const { state } = useLocation();
    const [image, setImage] = useState(state.thumbnail);

    return (
        <>
            <div className="flex justify-center items-center mt-10   ">
                <div className=" lg:w-4/5 lg:h-3/4	 image-container  bg-white shadow-lg rounded-lg overflow-hidden ">
                    <div className="grid grid-cols-1 sm:grid-cols-2  mt-2  ">
                        <div className=" lg:pt-8 lg:pr-6 p-4 rounded lg:mr-20">
                            <ImageMagnifier src={image} width={'270px'} height={'340px'} />
                            <div className='p-0'>
                                <div className=" grid grid-cols-4 gap-4 p-4  border-gray-200 ">
                                    {state.images.map((image, index) => (
                                        <img className="p-2 shadow-sm cursor-pointer rounded-xl hover:opacity-40 h-[90px] w-[90px]" key={index} src={image} onClick={() => { setImage(image) }} alt={`Product Image ${index}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="lg:mt-8 p-4  lg:ml-5 lg:pt-8 lg:pr-6 font-oswald">
                            <h1 className="text-xl font-semibold mb-2">{state.title}</h1>

                            <p className="text-[#272727] font-semibold opacity-75 text-lg mb-2">Category :  {state.categoryName}</p>

                            <div className=''>
                                <p class="text-lg font-semibold text-gray-800 font-oswald ">Product Description</p>
                            </div>
                            <p class="text-sm text-gray-700 mb-3 leading-relaxed font-oswald">
                                {state.description}
                            </p>
                            <div className="flex items-center mb-4">
                                <p>
                                    <span className="text-2xl font-oswald font-bold text-slate-900">Rs {state.price}/-</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserScrapDetails;
