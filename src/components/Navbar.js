import { React, useState, useEffect } from "react";
import { BtnDaftarAndLogin, InputNav, Keranjang, LogoNav, AkunPelanggan } from "./navbar/index";
import { Outlet } from "react-router-dom";
import { NavMobile } from "./navbar/NavMobile";

function Navbar({ showFromRegister, loginAkunPelanggan, loginAkun, keranjangs, clearProductBag }) {
    // State Scroll
    const [scrolled, setScrolled] = useState(false);
    const [backgroundHover, setBackgroundHover] = useState(false);

    useEffect(() => {
        // Function Scroll Untuk Aktif Background green NavBar
        const onScroll = () => {
            if (window.scrollY > 15) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Function Hover Background Black, NavBar Basket.
    const backgroundEnter = (value) => {
        setBackgroundHover(value)
    }

    // Function Untuk Menghilangkan hover black pada saat logout
    const clearBgBlack = (value) => {
        setBackgroundHover(value)
    }

    return (
        < div className="relative" >
            {/* navBar */}
            <nav className={scrolled ? "nav_scroll" : "nav_normal"}>
                <div className="w-full 2xl:w-[84.4rem] mx-auto">
                    <div className="flex justify-between items-center w-[90%] mx-auto">
                        {/* Logo Navbar */}
                        <LogoNav />

                        {/* From Input */}
                        <div className="mt-[9px] 360:mt-[7px] md:mt-[9px] w-full">
                            <InputNav />
                        </div>


                        {/* Keranjang */}
                        <div className="hidden lg:inline bg-black w-[4.1rem] mx-[2rem] rounded-[.8rem]" onMouseEnter={() => backgroundEnter(true)} onMouseLeave={() => backgroundEnter(false)}>
                            <Keranjang keranjangs={keranjangs} clearProductBag={clearProductBag} />
                        </div>

                        {/* List */}
                        <div className="h-[2rem] w-[2px] bg-white mr-[2rem] hidden lg:inline"></div>

                        <div className="hidden lg:inline">
                            {/* Button Login and Daftar */}
                            {loginAkunPelanggan.length > 0
                                // Profile User 
                                ? <div onMouseEnter={() => backgroundEnter(true)} onMouseLeave={() => backgroundEnter(false)}>
                                    <AkunPelanggan loginAkunPelanggan={loginAkunPelanggan} loginAkun={loginAkun} clearBgBlack={clearBgBlack} />
                                </div>
                                // Button Register Login
                                : <BtnDaftarAndLogin showFromRegister={showFromRegister} scrolled={scrolled} />
                            }
                        </div>

                    </div>
                </div>
            </nav>

            {/* NavBar Mobile */}
            <NavMobile keranjangs={keranjangs} loginAkunPelanggan={loginAkunPelanggan} showFromRegister={showFromRegister} />

            {/* Background bag */}
            <div className={!backgroundHover ? "hidden" : "bg-black/80 w-full h-screen fixed top-0 z-[40]"}></div>
            <Outlet />
        </div >
    )
}

export default Navbar