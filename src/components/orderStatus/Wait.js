import React from "react";
import { BsCheck2 } from "../../utils/icon";

const Wait = () => {
    return (
        <>
            <div className="w-[90%] mt-[-6rem]">
                <div className="flex justify-center">
                    <div className="inline-block bg-yellow-400 text-[5rem] rounded-full text-white pr-2 py-[2px]">
                        <BsCheck2 />
                    </div>
                </div>
                {/* Judul */}
                <h3 className="font-medium text-2xl capitalize text-center mt-[1rem] italic">
                    waiting for confirmation
                </h3>
                {/* text */}
                <p className="text-center mt-[.5rem]">Please wait, the admin is checking your payment.</p>
            </div>
        </>
    )
}

export default Wait