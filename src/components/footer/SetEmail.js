import React from "react";
import { ImArrowRight } from 'react-icons/im';

function SetEmail() {
    return (
        <div>
            <h3 className="footer_judul">STAY IN TOUCH</h3>
            <div className="bg-red-300 mt-[1rem] 500:mt-[2rem] relative">
                {/* Icon Arrow */}
                <div className="absolute top-[23%] right-[2.5rem] cursor-pointer text-[1.5rem] text-color-primary hover:text-color-hover transition-all duration-500 hover:translate-x-2">
                    <ImArrowRight />
                </div>

                {/* Submit Email */}
                <input type="text" placeholder="Enter Your Email.." className="ring-1 ring-color-primary focus:outline-none focus:border-color-primary w-full py-3 px-[3rem] placeholder:text-gray-500 placeholder:italic text-gray-500" />
            </div>
        </div>
    )
}

export default SetEmail