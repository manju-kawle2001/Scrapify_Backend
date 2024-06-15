import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import Typewriter from 'typewriter-effect';
export default function CoustumerSectionHome() {
    return <>
        <div className="h-auto p-5 flex justify-center items-center flex-col bg-gradient-to-b from-fuchsia-50 to-stone-50]">
            <div className="text-xl text-center sm:text-3xl mb-2 font-oswald font-bold">We make your home clean &<Typewriter
                options={{
                    strings: ['sustainable', 'effective', 'creative'],
                    autoStart: true,
                    loop: true,
                }}
            />
            </div>
            <div className="text-lg sm:text-2xl mb-4 font-oswald font-semibold">SO YOU DON'T HAVE TO</div>
            <div className="h-[5px] w-1/4 bg-[#CFDDF7]"></div>
            <div className="text-md sm:text-lg font-oswald mt-3 text-black text-center">
                <span className="opacity-60">Join over</span><span className="text-xl"> 400,000 Customers </span><span className="opacity-60">making small, easy,and impactful changes to reduce their waste and sell you</span><span className="text-xl"> scrap </span><span className="opacity-60"> and keep clean your house</span>
            </div>
            <div className="text-yellow-300 text-2xl flex  mt-3 justify-center items-center">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />
            </div>
            <div className="text-black text-sm mt-3 font-oswald">Customers rate us 4.6/5 based on 24234 reviews.</div>
            <div className="text-xl sm:text-2xl font-oswald font-extrabold mt-5">Your Journey Starts Here</div>
        </div></>
}