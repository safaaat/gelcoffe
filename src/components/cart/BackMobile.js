import { FaLongArrowAltLeft, DiCoffeescript } from "../../utils/icon"
import { Link } from "react-router-dom";
import React from "react";
import SendAddress from "./SendAddress";

const BackMobile = ({ dataAddress, onOffAddress }) => {
    return (
        <>
            <div className="parent_back-mobile">
                <div className="w-[95%] sm:w-[90%] mx-auto flex justify-between">
                    <div className="grid">
                        <div className="flex items-center gap-2 360:gap-3 pt-2 pb-1 sm:py-[16px]">
                            <Link to={"/"} className="text-xl text-color-gray relative before:absolute before:left-[1.2rem] before:top-[.2rem] before:bg-transparent before:w-[2.5rem] before:h-[1rem]">
                                <FaLongArrowAltLeft />
                            </Link>
                            <p className="capitalize font-semibold text-base 360:text-lg ">bag</p>
                        </div>

                        {/* Fitur Address */}
                        <div className="text-color-gray 390:mt-2">
                            <SendAddress dataAddress={dataAddress} onOffAddress={onOffAddress} />
                        </div>
                    </div>

                    <Link to={"/"} className="logo_nav-checkout mt-[-.5rem]">
                        <DiCoffeescript />
                        <h5 className="text-[1.1rem] 360:text-[1.2rem] md:text-[1.5rem] lg:text-[2rem] -mt-2 lg:-mt-[1.4rem] capitalize">gel coffe</h5>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default BackMobile