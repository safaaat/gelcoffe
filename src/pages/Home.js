import React from "react";
import { HeroBanner, MenuBanner, About } from "../components/home/index"

function Home({ linkProduct }) {
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