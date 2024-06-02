import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const PostMenu = () => {
    return (
        <div className="dropdown dropdown-top dropdown-end fixed rounded-full bg-base-100 backdrop-blur-sm shadow-xl h-14 bottom-20 right-4 md:right-6 lg:bottom-12 lg:right-14">
            <div className="aspect-square h-full">
                <div tabIndex={0} role="button" className="grid h-full w-full place-items-center rounded-full hover:bg-base-300">
                    <FontAwesomeIcon icon={faPlus} className="text-2xl text-slate-500" />
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li className="my-1"><a>新規投稿</a></li>
                    <li className="my-1"><a>下書き</a></li>
                </ul>
            </div>
        </div>
    );
};

export default PostMenu;
