import { React, useCallback, useEffect } from "react";
import { HeroBanner, MenuBanner, About } from "../components/home/index"

function Home({ linkProduct, updateOnOffNavbar }) {
    const changeOnOffNavbar = useCallback(() => {
        return updateOnOffNavbar("on");
    }, [updateOnOffNavbar]);

    useEffect(() => {
        changeOnOffNavbar();
    }, [changeOnOffNavbar]);

    return (
        <div>
            {/* Hero Banner */}
            <HeroBanner linkProduct={linkProduct} />

            {/* Menu */}
            <div className="pt-[43.5rem]">
                <MenuBanner linkProduct={linkProduct} />
            </div>

            {/* About */}
            <About />
        </div>
    )
}

export default Home