import React from "react";
import { EmptyBag } from "../components/navbar/index";
import { Link } from "react-router-dom"
import ListProduct from "../components/cart/ListProduct";

function Cart({ keranjangs, linkProduct, clearProductBag, putAddMinProduct }) {
    return (
        <div>
            <div className="bg-green"></div>

            {keranjangs.length > 0
                ? <ListProduct keranjangs={keranjangs} clearProductBag={clearProductBag} putAddMinProduct={putAddMinProduct} />

                : <div className="2xl:w-[84.3rem] mx-auto">
                    <div className="w-[90%] mx-auto">
                        <h3 className="text-color-primary ml-3 mt-[2rem] relative before:absolute before:w-[4.3rem] before:h-[3px] before:-bottom-[.6rem] before:left-0 before:bg-color-primary">Shopping</h3>
                        <span className="bg-gray-400 w-full h-[1px] flex mt-2"></span>
                        <div className="mt-4 mb-[4rem]">
                            <EmptyBag />
                            <div className="flex justify-center">
                                <Link to={"/menu"} className="bg-color-primary text-white py-3 px-[3rem] rounded-[.7rem] hover:bg-color-hover-btn duration-300 transition-all" onClick={() => linkProduct("products")}>
                                    <button className="capitalize">start shopping</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default Cart