import { React, useState, useEffect, useCallback } from "react";
import { GiFoodTruck, BiDrink, MdFastfood, DiCoffeescript, FaCheese } from "../utils/icon";
import { Outlet } from "react-router-dom";
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from "../utils/icon";

const Icon = ({ value }) => {
    if (value === "Semua") return <GiFoodTruck className="text-[1.3rem] 360:text-[1.9rem] text-lime-500" />
    if (value === "Coffe") return <DiCoffeescript className="text-[1.5rem] 360:text-[1.8rem] text-[#cf9831]" />
    if (value === "Juice") return <BiDrink className="text-[1.2rem] 360:text-[1.6rem] text-fuchsia-600" />
    if (value === "Cemilan") return <FaCheese className="text-[1.2rem] 360:text-[1.5rem] text-red-600" />
    if (value === "Makanan") return <MdFastfood className="text-[1.3rem] 360:text-[1.5rem] text-blue-600" />
}

const TextIcon = ({ value }) => {
    if (value === "Semua") return <p className="group-hover:text-lime-500 capitalize">semua</p>
    if (value === "Coffe") return <p className="group-hover:text-[#cf9831] capitalize">Coffe</p>
    if (value === "Juice") return <p className="group-hover:text-fuchsia-600 capitalize">Juice</p>
    if (value === "Cemilan") return <p className="group-hover:text-red-600 capitalize">Cemilan</p>
    if (value === "Makanan") return <p className="group-hover:text-blue-600 capitalize">Makanan</p>
}

const CategoryIcon = ({ value }) => {
    if (value === "show") return <BsFillArrowLeftSquareFill />
    if (value === "off") return <BsFillArrowRightSquareFill />
}

function Category({ categorys, linkProduct, heightCategory, updateOnOffNavbar }) {
    // State Scroll
    const [scrolled, setScrolled] = useState(false);
    const [onOffCategory, setOnOffCategory] = useState("show");
    const [posisiScroll, setPosisiScroll] = useState("parent-category top_awal");

    useEffect(() => {
        // Function Scroll Untuk Aktif Background green NavBar
        const onScroll = () => {
            // let mob_view = window.matchMedia("(max-width: 768px)");
            if (window.scrollY > 15 && window.scrollY < heightCategory - 278) {
                setScrolled(true);
            } else if (window.scrollY >= heightCategory - 278) {
                setScrolled(false);
                return setPosisiScroll("parent-category bottom-category");
            } else {
                setScrolled(false);
                return setPosisiScroll("parent-category top_awal");
            }
        }
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [heightCategory]);

    const showOffCategory = () => {
        if (onOffCategory === "show") {
            return setOnOffCategory("off");
        } else if (onOffCategory === "off") {
            return setOnOffCategory("show");
        }
    }

    // ketika category di click scroll berada di posisi top
    function ScrollToTop() {
        window.scrollTo(0, 0);
    }

    const nampungProduck = (value) => {
        // linkProduct()
        if (value.nama === "Semua") {
            linkProduct("products")
            setOnOffCategory("off");
            ScrollToTop()
            return
        } else if (value.nama === "Coffe") {
            linkProduct(`products?category.nama=${value.nama}`)
            setOnOffCategory("off");
            ScrollToTop()
            return
        } else if (value.nama === "Juice") {
            linkProduct(`products?category.nama=${value.nama}`)
            setOnOffCategory("off");
            ScrollToTop()
            return
        } else if (value.nama === "Cemilan") {
            linkProduct(`products?category.nama=${value.nama}`)
            setOnOffCategory("off");
            ScrollToTop()
            return
        } else if (value.nama === "Coffe") {
            linkProduct(`products?category.nama=${value.nama}`)
            setOnOffCategory("off");
            ScrollToTop()
            return
        } else if (value.nama === "Makanan") {
            linkProduct(`products?category.nama=${value.nama}`)
            setOnOffCategory("off");
            ScrollToTop()
            return
        }
    }

    const changeOnOffNavbar = useCallback(() => {
        return updateOnOffNavbar("on");
    }, [updateOnOffNavbar]);

    useEffect(() => {
        changeOnOffNavbar();
    }, [changeOnOffNavbar]);

    return (
        < div className="w-full 2xl:w-[84.4rem] mx-auto relative overflow-hidden" >
            <div className="bg-green"></div>

            <div>
                <div className={!scrolled ? `${posisiScroll}` : "parent-category-aktif"}>
                    <button className={onOffCategory === "show" ? "btn_show-category" : "btn_off-category"} onClick={() => showOffCategory()}>
                        <CategoryIcon value={onOffCategory} />
                    </button>

                    <ul className={onOffCategory === "show" ? "ul_category-aktif" : "ul_category"}>
                        {categorys.map((data) => (
                            <li key={data.id} className="grid justify-items-center px-[.5rem] 360:px-[1rem] rounded-xl cursor-pointer group" onClick={() => nampungProduck(data)}>
                                <Icon value={data.nama} />
                                <div className="text-sm 360:text-base">
                                    <TextIcon value={data.nama} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <Outlet />
        </ div>
    )
}

export default Category