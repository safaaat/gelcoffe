import React from "react";
import { Link } from "react-router-dom";

function HeroBanner({ linkProduct }) {
    return (
        <div>
            <div className="relative w-full 2xl:w-[84.4rem] mx-auto z-10 text-center">
                <div className="w-[100%] h-[700px] top-0 -z-10 -left-[0rem] absolute bg-center bg-fixed bg-cover flex justify-center items-center flex-col gap-2" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/images/home/sub.png'})` }}>
                    <h1 className="judul-hero">enjoy the coffee</h1>
                    <p className="praf-home">Well-crafted coffee made simple to enjoy and start your day!</p>
                    <button className="btn_buy" onClick={() => linkProduct("products")}>
                        <Link to={"category"}>order now</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner