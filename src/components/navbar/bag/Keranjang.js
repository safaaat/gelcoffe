import { React } from "react";
import { Link } from "react-router-dom";
import { BsFillBagCheckFill } from "../../../utils/icon";
import { totalSemuaBag } from "../../../utils/totalSemuaBag"
import { KeranjangMenu, EmptyBag, ViewBag } from "../index"


function Keranjang({ keranjangs, clearProductBag }) {
    return (
        <div className="relative">

            <div className="group">
                <Link to={"/cart"}>
                    <p className="absolute -right-4 -top-3 py-[1px] px-[8px] rounded-full bg-red-500 cursor-default">{totalSemuaBag(keranjangs)}</p>
                    <div className="text-[1.6rem] cursor-pointer hover:bg-color-hover transition-all duration-500 bg-white text-color-black py-[6px] px-[10px] rounded-xl hover:text-white">
                        <BsFillBagCheckFill />
                    </div>
                </Link>

                <div className="absolute hidden left-0 top-[2.3rem] w-[2.7rem] h-[2.3rem] group-hover:inline-block"></div>

                {/* Bag Shopping */}
                <div className="absolute mt-2 bg-white overflow-hidden w-[0rem] h-auto -right-[400%]  rounded-3xl text-gray-500  opacity-0  group-hover:opacity-100 group-hover:w-[30rem] z-[50]">
                    <div className="grid grid-cols-2 w-[90%] mx-auto py-3 pl-4 capitalize text-color-primary">
                        <p className="relative before:absolute before:w-[4.5rem] before:h-[3px] before:bg-color-primary before:-bottom-[.8rem]">shopping</p>

                        {/* Jika User Login Maka ViewBag akan ditampilkan */}
                        {keranjangs.length > 0
                            ? <ViewBag />
                            : ""
                        }
                    </div>

                    {/* Line */}
                    <span className="bg-gray-400 w-full h-[1px] grid"></span>

                    {/* Jika Keranjang  */}
                    {keranjangs.length === 0
                        ? <EmptyBag />
                        : <KeranjangMenu keranjangs={keranjangs} clearProductBag={clearProductBag} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Keranjang