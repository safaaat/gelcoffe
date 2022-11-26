import React from "react";
import { Link } from "react-router-dom"

function NotFound() {
    return (
        <div>
            <div className="bg-[#063f06] w-full h-[6.5rem] md:h-[8rem] lg:h-[9rem]"></div>

            <div className="flex justify-center items-center py-[2.2rem] sm:py-[4.5rem]">
                <div className="grid justify-items-center text-center">
                    <img src={process.env.PUBLIC_URL + "/assets/images/loading/img-notfound.png"} alt="img-NotFound" />
                    <h3 className="capitalize font-bold text-xl">page not found</h3>
                    <p className="mt-2">Hmm, the page you were looking for doesn’t seem to exist anymore.</p>
                    <button className="bg-color-primary py-3 px-6 rounded-xl capitalize text-white transition-all duration-300 hover:bg-color-hover-btn mt-3">
                        <Link to={"/"}>back to GelCoffe</Link >
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotFound