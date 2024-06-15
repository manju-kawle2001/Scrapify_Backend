import { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { RiShoppingCartLine } from "react-icons/ri";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Login from "../Home/Login";
import Signup from "../Home/Signup";
import SearchProductMobile from "../ui/SearchProductMobile";
import Sidebar from "./Sidebar";

import swal from "sweetalert";
import { UserContext } from "../../App";

export default function Navbar() {

    const { user, setUser } = useContext(UserContext);
    const [openSidebar, closeSidebar] = useState(false);
    const [seachOnMobile, setSeachOnMobile] = useState(false);
    const [signup, setSignup] = useState(false)
    const [login, setLogin] = useState(false)
    const [iscrapDeleteBtn, setDeleteScrapBtn] = useState(false);
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    const { state } = useLocation();



    useEffect(() => {
        const userData = sessionStorage.getItem('current-user');
        if (userData) {
            const parsedUserData = JSON.parse(userData);

        }
    }, [user]);

    const handleLogout = () => {
        swal({
            title: "Are you sure to Logout?",
            icon: "warning",
            buttons: ["Cancel", "OK"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Log Out Successfully", {
                        icon: "success",
                    });
                    setUser(null);
                    sessionStorage.removeItem('current-user');
                    navigate('/');
                } else {
                    setDeleteScrapBtn(false);
                }
            });
    };

    const handleNotfication = () => {
        navigate('/profile', { state: true });
    }

    const handleCart = () => {
        navigate('/shopingcart')
    }

    return <>
        <div className="relative h-[100px] bg-[#f6f6f6]">

            <div className=" h-[60px] flex ml-6 sm:-ml-4 justify-center items-center ">
                <div className=" h-full visible sm:hidden w-1/3  flex ">
                    <button onClick={() => closeSidebar(true)} className=""> <IoMdMenu className="text-3xl" /></button>
                </div>

                <div className="sm:w-1/4  w-1/2 ml-6 font-oswald flex  justify-center items-start sm:pl-11 flex-col h-[60px]">
                    {/* logo */}
                    <h3 className="text-2xl font-extrabold">SCRAPIFY</h3>
                    <span className="text-sm font-bold opacity-65">"Scrap, Sell, Save"</span>
                </div>
                <div className=" sm:visible  hidden sm:w-1/2 font-oswald sm:flex justify-center items-center  h-[60px]">
                    {/* searchbar */}
                    <input placeholder="Search Product . . . . . . ." className="p-3  w-10/12 h-[40px] rounded-l-2xl border-l-2 border-slate-800 border-y-2"></input>
                    <button className=" w-[80px] text-slate-600 transition duration-600 ease-in-out hover:bg-black hover:text-white bg-[#CFDDF7] h-[40px] rounded-r-2xl font-oswald font-semibold border-r-2 border-slate-800 border-y-2">Serach</button>
                </div>
                <div className="sm:w-1/4 1/2  font-oswald h-[60px] flex justify-around items-center ">
                    <div className="hidden md:block">
                        {/* signup/signin */}
                        <div className="uppercase">
                            👋 Hello {user ? (
                                <Link to="/profile" className=""> {user.username},</Link>
                            ) : (
                                <span>
                                    Friend,
                                </span>
                            )}
                        </div>

                        {
                            user ? <button onClick={handleLogout} className="cursor-pointer ml-8">Log Out</button> : <div >
                                <button onClick={() => setLogin(true)} className="cursor-pointer">Login</button>
                                &nbsp;&&nbsp;
                                <button onClick={() => setSignup(true)} className="cursor-pointer">Register</button>
                            </div>
                        }

                    </div>
                    <div className="flex justify-around md:w-1/3 items-center">

                        {/* add to cart / notification */}
                        <FaSearch className="text-xl sm:text-2xl mr-5 sm:hidden cursor-pointer" onClick={() => setSeachOnMobile(true)} />
                        <div>
                            <MdOutlineNotificationsNone onClick={handleNotfication} className="text-3xl hidden sm:block cursor-pointer" />
                            <p className="h-[18px] hidden sm:block text-center absolute top-2  w-[18px] bg-black text-[12px] rounded-full text-white">1</p>
                        </div>
                        <div>
                            <RiShoppingCartLine onClick={handleCart} className="text-3xl mr-4 sm:m-2  cursor-pointer" />
                            <p className="h-[18px] text-center absolute top-2 sm:right-11 md:right-5 w-[18px] bg-black text-[12px] rounded-full text-white">2</p>

                        </div>
                    </div>
                </div>
            </div>
            {/* s=navbar second section */}
            <div className="h-[1px] opacity-40 ml-2 mr-2 bg-black  "></div>
            <div className="sm:pl-10 sm:pr-10 h-[40px] flex justify-around ml-3 mr-3 items-center">

                <button onClick={() => closeSidebar(true)} className="hidden sm:visible font-oswald sm:flex justify-center cursor-pointer items-center"> <IoMdMenu className="text-2xl" /> &nbsp;<span className="cursor-pointer">All</span></button>

                <div className="font-oswald ">
                    <NavLink to={'/'}>Home</NavLink>
                </div>
                <div className="  font-oswald ">
                    <NavLink to={'shop'}>Shop</NavLink>
                </div>
                <div className=" sm:block font-oswald ">
                    <NavLink to={'/category'}>Category</NavLink>
                </div>
                <div className=" sm:block font-oswald ">
                    <NavLink to={'/ourbrand'}>Our Brand</NavLink>
                </div>

            </div>
            <div className="h-[1px] opacity-40 ml-2 mr-2 bg-black"></div>

            {openSidebar ? <Sidebar handleLogout={handleLogout} setLogin={setLogin} setSignup={setSignup} closeSidebar={closeSidebar} openSidebar={openSidebar} /> : ''}
            {seachOnMobile ? <SearchProductMobile setSeachOnMobile={setSeachOnMobile} /> : ''}
        </div>
        {/*Sigup login modal */}

        {signup ? <Signup setLogin={setLogin} setSignup={setSignup} /> : ''}
        {login ? <Login setLogin={setLogin} setSignup={setSignup} /> : ''}

    </>

}