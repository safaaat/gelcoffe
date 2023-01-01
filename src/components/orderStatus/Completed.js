import React from "react";
import { BsCheck2All } from "../../utils/icon";

const Completed = () => {
    return (
        <>
            <div className="w-[90%] mt-[-6.2rem]">
                <div className="flex justify-center">
                    <div className="bg-green-400 inline-block text-[4.5rem] pl-1 pr-4 py-[.4rem] rounded-full text-white">
                        <BsCheck2All />
                    </div>
                </div>

                <div className="mt-[1rem]">
                    {/* Judul */}
                    <h3 className="text-center font-medium text-black capitalize text-2xl italic">Thank you for shopping!</h3>
                    {/* Text */}
                    <p className="text-center mt-[.5rem]">Your payment was successful and your order will be processed immediately.</p>
                </div>
            </div>
        </>
    )
}

export default Completed