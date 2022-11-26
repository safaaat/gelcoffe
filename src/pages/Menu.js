import { useEffect } from "react";
import { useCallback } from "react";
import { React, useRef } from "react";
import { CardProduct, Loading } from "../components/menu/index"

const Menu = ({ products, addCart, loadingMenu, updateHaightCategory }) => {
    const ref = useRef(null);

    const detectSize = useCallback(() => {
        updateHaightCategory(ref.current.clientHeight, ref.current.clientWidth);
    }, [updateHaightCategory])

    useEffect(() => {
        detectSize()
        window.addEventListener("resize", detectSize);
        return () => {
            window.removeEventListener("resize", detectSize);
        }
    }, [detectSize])

    return (
        <div className="w-full 2xl:w-[85.4rem] mx-auto mb-[5rem]">
            {/* <div className="bg-[#063f06] w-full h-[6.5rem] md:h-[8rem] lg:h-[9rem]"></div> */}
            <div className="w-[90%] mx-auto px-1 mt-[1rem]" ref={ref}>
                <div>
                    {loadingMenu
                        ? <CardProduct products={products} addCart={addCart} />
                        : <Loading />
                    }
                </div>
            </div>

        </div >
    )
}

export default Menu