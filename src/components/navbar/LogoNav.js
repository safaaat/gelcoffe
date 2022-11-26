import React from "react";
import { Link } from "react-router-dom";
import { DiCoffeescript } from "react-icons/di";
import { useState } from "react";
import { useEffect } from "react";

function LogoNav() {

    const [scrolledLogo, setScrolledLogo] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 15) {
                setScrolledLogo(true);
            } else {
                setScrolledLogo(false);
            }
        }

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="w-[6.5rem] md:w-[7.3rem] lg:w-[15rem] flex">
            <Link to={"/"} className={scrolledLogo ? "logo-aktif" : "logo"}>
                <DiCoffeescript />
                <h5 className="text-[1.1rem] 360:text-[1.2rem] md:text-[1.5rem] lg:text-[2rem] -mt-2 lg:-mt-[1.4rem] capitalize">gel coffe</h5>
            </Link>
        </div>
    )
}

export default LogoNav