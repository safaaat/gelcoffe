import React from "react";
import { RiCloseFill } from "../../utils/icon";

const Cansel = () => {
    return (
        <>
            <div className="w-[90%] mt-[-6rem]">
                {/* Logo Cansel */}
                <div className="flex justify-center">
                    <div className="bg-red-500 rounded-full text-white text-[5rem] inline-block">
                        <RiCloseFill />
                    </div>
                </div>
                {/* Judul */}
                <h3 className="font-medium text-2xl capitalize text-center mt-[1rem] italic">
                    Order cancelled
                </h3>
                {/* text */}
                <p className="text-center mt-[.5rem]">You canceled this order or you have passed the payment deadline.</p>
            </div>

        </>
    )
}

export default Cansel