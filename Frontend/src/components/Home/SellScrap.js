import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import ScrapUploadForm from "../ui/ScrapUploadForm";
import UserScrapList from "../ui/UserScrapList";

export default function SellScrap() {
    const [Upload, setUpload] = useState(false);

    function HandleshowForme() {
        Upload ? setUpload(false) : setUpload(true);
    }

    return (
        <div className="sm:w-full relative">
            <button onClick={HandleshowForme} className="shadow-2xl bg-[#faf7ef] fixed right-14 bottom-5 p-4 rounded-full text-2xl">
                <FaPlus className="my-float" />
            </button>
            <div className="flex justify-center items-center w-full h-auto  ">
                <div className="flex justify-center items-center w-full h-auto ">
                    {Upload ? <ScrapUploadForm /> : <UserScrapList />}
                </div>
            </div>
        </div>
    );
}
