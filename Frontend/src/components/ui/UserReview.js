import SlRating from '@shoelace-style/shoelace/dist/react/rating';
import React from 'react';
import "../ui/css/ProductPage.css";

const UserReview = () => {

    return (
        <> 
            <div className='w-full font-oswald '>
                <div style={{border:"2px", borderRadius:"15px", borderColor:"red"}} class="w-4/5 mx-auto bg-white  rounded-lg p-6 mt-5  review-container">
                    <div class="flex justify-between mb-4">
                        <div>
                            <p class="text-lg text-gray-800">Ankit</p>
                            <div class="flex items-center mt-1">
                            <SlRating label="Rating" precision={0.5} value={4.5} />
                            </div>
                        </div>
                        <p class="text-xs text-gray-500">April 18, 2024</p>
                    </div>
                    <p class="text-sm text-gray-700 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                        Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
                    </p>
                </div>
            </div>
        </>
    );
};

export default UserReview;
