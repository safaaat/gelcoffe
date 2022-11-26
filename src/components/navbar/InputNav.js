import React from "react";
import { AiOutlineSearch } from 'react-icons/ai';

function InputNav() {
    return (
        <form className="w-full relative flex items-center">
            {/* Button Input */}
            <div className="absolute z-[1] bg-color-primary right-0 py-2 px-2 rounded-lg text-xl mr-[5px] cursor-pointer hover:bg-color-hover transition-all duration-500">
                <AiOutlineSearch />
            </div>

            {/* Input */}
            <input className="placeholder:italic placeholder:text-slate-400 text-color-gray block bg-white w-full border border-slate-300 rounded-md py-[10px] px-3 shadow-sm focus:outline-none focus:border-color-hover focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" />
        </form>
    )
}

export default InputNav