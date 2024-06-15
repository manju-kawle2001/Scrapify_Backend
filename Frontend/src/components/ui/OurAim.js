import Marquee from "react-fast-marquee";
import q1 from './img/q1.png';
import q2 from './img/q2.png';
import q3 from './img/q3.png';
import q4 from './img/q4.png';
export default function OurAim() {
    return <>
        <div className="bg-[#FAF7EF] h-auto md:[450px]">
            <h3 className="text-center p-5 font-oswald text-lg sm:text-2xl font-bold sm:pt-8 lg:p-5">ON A QUEST FOR A CLEAN PLANET AND HAPPY YOU!</h3>
            <div className="grid  grid-cols-2 md:flex mt-3 md:justify-around  md:w-full md:h-[300px] ">
                <div className="md:w-1/2  flex-col flex items-center h-full lg:w-1/5">
                    <img className=" sm:h-[200px] sm:w-[200px] h-[100px] w-[100px] rounded-full  bg-white" src={q2} />
                    <h4 className="font-oswald sm:text-xl text:lg text-center mt-3 font-bold">1% FOR THE PLANET</h4>
                    <h4 className="font-oswald sm:text-md text:sm text-center font-light" >Every purchase supports companies that care.</h4>
                </div>
                <div className="md:w-1/2 flex-col  h-full lg:w-1/5 flex items-center ">
                    <img className="sm:h-[200px] sm:w-[200px] h-[100px] rounded-full bg-white" src={q1} />
                    <h4 className="font-oswald sm:text-xl text:lg text-center mt-3 font-bold">Power of 3-R</h4>
                    <h4 className="font-oswald sm:text-md text:sm text-center font-light" >Reduce , Reuse & Recycle</h4>
                </div>
                <div className="md:w-1/2 md:m-4 flex items-center flex-col  h-full lg:w-1/5">
                    <img className="sm:h-[200px] sm:w-[200px] h-[100px] w-[100px] rounded-full  bg-white" src={q4} />
                    <h4 className="font-oswald sm:text-xl text:lg text-center mt-3 font-bold">Quick Connect</h4>
                    <h4 className="font-oswald sm:text-md text:sm text-center font-light" >Find scrap dealer near you in one click</h4>
                </div>
                <div className="md:w-1/2 flex items-center flex-col  h-full lg:w-1/5">
                    <img className="sm:h-[200px] sm:w-[200px] h-[100px] w-[100px] rounded-full bg-white" src={q3} />
                    <h4 className="font-oswald sm:text:lg sm:text-xl text-center mt-3 font-bold">Be Creative</h4>
                    <h4 className="font-oswald sm:text:sm sm:text-md text-center font-light" >Sell/purchase you creative product on our application</h4>
                </div>
            </div>
        </div>
        {/* ---------------------------------- */}
        <Marquee pauseOnHover={true} style={{ cursor: "pointer" }}>
            <div className="h-[70px] bg-[#14213D]  text-white  sm:text-xl font-bold w-screen font-oswald flex justify-around items-center">
                <div className="text-center ">PLASTIC FREE</div>
                <div className="text-center  ">CLEAN INGREDIENTS</div>
                <div className="text-center ">SUSTAINABLE MATERIALS</div>
                <div className="text-center ">MAKE-MONEY</div>
            </div>
        </Marquee>
    </>
}




