import { useState } from "react";
import ScrapUploadForm from "../ui/ScrapUploadForm";
import UserScrapList from "../ui/UserScrapList";

export default function SellProducts() {
    const [Upload, setUpload] = useState(false);

    function HandleshowForme() {
        Upload ? setUpload(false) : setUpload(true);
    }

    return (
        <div className="sm:w-full">
            <button onClick={HandleshowForme}
                title="Add New"
                className="group w-[55px]  cursor-pointer outline-none float-right mr-10 mt-2 hover:rotate-90 duration-300"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50px"
                    height="50px"
                    viewBox="0 0 24 24"
                    className="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
                >
                    <path
                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                        strokeWidth="1.5"
                    ></path>
                    <path d="M8 12H16" strokeWidth="1.5"></path>
                    <path d="M12 16V8" strokeWidth="1.5"></path>
                </svg>
            </button>

            <div className="flex justify-center items-center w-full h-auto  ">
                {Upload ? <ScrapUploadForm /> : <UserScrapList />}
            </div>
        </div>
    );
}
