import { FaSearch } from "react-icons/fa";
export default function SearchProductMobile({ setSeachOnMobile }) {
    return <>
        <div className="absolute z-30 w-screen h-screen top-0   bg-slate-600">
            <input placeholder="Search . . ." className="w-screen  rounded h-[40px] p-4 font-oswald" />
            <FaSearch className="text-2xl right-3 absolute top-2" onClick={() => setSeachOnMobile(false)} />
        </div>
    </>
}