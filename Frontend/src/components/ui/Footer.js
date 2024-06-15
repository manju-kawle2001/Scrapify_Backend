import React from 'react';
import { NavLink } from 'react-router-dom';
import googleApple from './img/google.png';
export default function Footer() {
    return <>
        <div className="bg-[#DEDED2] h-auto w-screen">
            <div className="h-auto   flex justify-center items-start flex-col sm:flex-row">
                <div className="mt-5 sm:w-1/2 h-full  flex justify-center items-start p-8 flex-col">
                    <h3 className="font-oswald text-3xl font-bold mb-5">Stay In Touch</h3>
                    <p className="font-oswald text-lg font-medium mb-5">Get our emails! Sign up to receive updates on new arrivals, sales, exclusive content, and more straight to your inbox!</p>
                    <p className="font-oswald text-sm font-light">By entering your email address, you agree to receive ZeroWasteStore.com offers, promotions, other commercial messages. You can view our Privacy Policy here and you may unsubscribe at any time.</p>
                </div>
                <div className="mb-10 mt-5  sm:w-1/2 flex justify-center items-start h-full p-5 flex-col">
                    <input className='m-5 p-2 rounded-xl pl-3 w-2/3' name='email' placeholder='Enter yout mail' />
                    <button className=' m-5 bg-slate-900 hover:bg-[#CFDDF7] text-white hover:text-slate-900 h-[40px] w-[120px] font-oswald rounded-full'>Subscribe</button>
                    <div className='font-oswald font-sm'>
                        <input type='checkbox' className='ml-5 mr-5' /><span>I agree with</span> <span className='text-blue-600'>Term & Conditions</span>
                    </div>
                </div>
            </div>
        </div >
        <div className='h-[1px] bg-black opacity-35'></div>
        <div className='bg-[#DEDED2] flex sm:flex sm:justify-between p-5 sm:items-center flex-col sm:flex-row'>
            <div className=' w-full sm:w-1/3 h-[200px] flex - justify-start items-center flex-col'>
                {/* logo */}
                <div className=''>
                    <h3 className="text-3xl font-extrabold cursor-pointer">SCRAPIFY</h3>
                    <span className="text-sm font-bold opacity-65 cursor-pointer text-center">"Scrap, Sell, Save"</span>
                </div>
                <img className='w-2/5 cursor-pointer' src={googleApple} />
            </div>
            <div className='flex  justify-satrt items-center  flex-col w-full sm:w-1/3 h-[200px] m-2'>
                <h3 className='text-start font-oswald text-xl font-bold'>Get To Know Us</h3>
                <div className='flex h-2/4 justify-around items-start flex-col'>
                    <NavLink className='text-start text-black opacity-65 hover:opacity-85  font-bold text-sm font-oswald'>Blog</NavLink>
                    <NavLink className='text-start text-black opacity-65 hover:opacity-85  font-bold text-sm font-oswald'>Who We Are</NavLink>
                    <NavLink className='text-start text-black opacity-65 hover:opacity-85  font-bold text-sm font-oswald'>What we Solve</NavLink>
                    <NavLink className='text-start text-black opacity-65 hover:opacity-85  font-bold text-sm font-oswald'>Our Mission</NavLink>
                </div>
            </div>
            <div className='flex items-center  flex-col   w-full sm:w-1/3 h-[200px] m-2'>
                <h3 className='text-start font-oswald text-xl font-bold'>Our Platform</h3>
                <div className='flex h-2/4 justify-around items-start flex-col '>
                    <NavLink className='text-start text-black opacity-65 hover:opacity-85 font-bold text-sm font-oswald ' to={'/shop'}>Buy Products</NavLink>
                    <NavLink className='text-start text-black opacity-65 hover:opacity-85 font-bold text-sm font-oswald '>List Your Scrap</NavLink>
                    <NavLink className='text-start text-black opacity-65 hover:opacity-85 font-bold text-sm font-oswald '>List Your Product</NavLink>
                    <NavLink className='text-start text-black opacity-65 hover:opacity-85 font-bold text-sm font-oswald '>Lock You Deal Now</NavLink>
                </div>
            </div>
        </div>
    </>
}