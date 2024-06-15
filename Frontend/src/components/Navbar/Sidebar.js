import { useContext } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
export default function Sidebar({ closeSidebar, setSignup, setLogin, handleLogout, openSidebar }) {
    const { user, setUser } = useContext(UserContext);
    const { categoryList, isLoading, error } = useSelector((store) => store.category);
    return <>
        <div className={`absolute top-0 z-30 md:w-6/12 lg:w-5/12 sm:w-7/12 w-full bg-slate-600 h-screen transition-transform duration-900 ease-in-out transform ${openSidebar ? 'translate-x-0' : '-translate-x-full'} `}>
            <div className="size-full bg-slate-300">
                <div className="h-[50px] bg-black flex justify-around  items-center ">
                    <h3 className="text-center font-oswald w-10/12  text-white text-2xl py-2">Screpify</h3>
                    <IoCloseSharp onClick={() => closeSidebar(false)} className="text-white h-full text-center -mr-4 text-3xl" />
                </div>
                {/* login signup */}
                <div className="h-[50px] sm:hidden font-oswald font-medium flex justify-center items-center flex-col bg-white">
                    {/* signup/signin */}
                    <div className="cursor-pointer">
                    👋 Hello {user ? (
                                <Link to="/profile" onClick={()=>closeSidebar(false)} className=""> {user.username},</Link>
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
                {/* links */}
                <div className="ml-5 mt-2">
                    <h3 className="font-oswald text-xl font-medium text-slate-600">Tranding</h3>
                    <ul className="text-slate-600 cursor-pointer list-item ml-5 font-oswald text-lg font-normal">
                        <li >New Arraivals</li>
                        <li >Shop</li>
                    </ul>
                </div>
                <div className="ml-5 mt-2">
                    <h3 className="font-oswald text-xl  text-slate-600 font-medium">Category</h3>
                    <ul className="list-item ml-5 cursor-pointer font-oswald text-lg text-slate-600 font-normal">
                        {
                            categoryList.map((category) => <li key={category._id}>{category.categoryName}</li>)
                        }
                    </ul>
                </div>
            </div>
        </div>


    </>
}