"use client";

import { Carousel } from "flowbite-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../App";

export default function CarouselHome(params) {

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate()
    const handleClick = () => {

        if (user) {
            navigate('/profile', { state: true })
            return
        }
        else {
            toast.info('Dear User Login First')
        }

    }
     const handleClickShopNow = ()=>{
        navigate('/shop')
     }

    return <>
        <Carousel>
            <div className="h-full   -z-0">
                <div className="flex ml-8 flex-col justify-center  font-bold sm:w-1/2  h-full font-oswald">
                    <div className="h-2/5 ml-3">
                        <p className="text-xl mb-3 md:text-3xl">Sell Your Scrap, Find Unique Eco-Creations</p>
                        <p className="text-md md:text-lg font-oswald font-medium">Sell Scrap, Support Sustainable Creation</p>
                    </div>
                    <div className="mt-3 sm:mt-0">
                        <button  onClick={handleClickShopNow} className="text-black bg-[#CFDDF7] rounded-md md:px-3 md:py-2 px-2 font-medium py-1 hover:bg-slate-800 hover:text-white hover:opacity-70 ml-4">Shop Now</button>
                        <button onClick={handleClick} className="text-white bg-slate-800 rounded-md md:px-3 md:py-2 px-2 font-medium py-1 hover:bg-[#CFDDF7] hover:text-black hover:opacity-70 ml-4">Sell Scrap</button>
                    </div>
                </div>
            </div>
        </Carousel>
    </>
}