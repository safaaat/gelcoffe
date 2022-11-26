import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineDown, AiFillShopping, FaAddressBook, MdPersonalInjury } from "../../utils/icon"
import { useState } from "react";


function AkunPelanggan({ loginAkunPelanggan, loginAkun, clearBgBlack }) {
    const [navClick, setNavClick] = useState(false)

    let dataAkun = loginAkunPelanggan[0];

    const btnLogout = (value) => {
        loginAkun([])
        clearBgBlack(value)
    }

    const navUrlClick = (value) => {
        setNavClick(value);
        clearNavClick(value);
    }

    const clearNavClick = (value) => {
        setInterval(() => {
            if (value === true) {
                setNavClick(false)
            }
        }, 1000);
    }

    return (
        <div className="relative flex items-center gap-5 ">

            <div className="group">
                <div className="flex items-center gap-3 hover:bg-gray-500/30 py-1 px-3 cursor-pointer rounded-md transition-all duration-300 relative">
                    <div className="text-xl">
                        <FaUserAlt />
                    </div>
                    <div className="flex gap-1 text-xl items-center group-hover:text-color-hover">
                        <p>Hi,</p>
                        <h3 className="capitalize font-semibold">{dataAkun.user_name}</h3>
                        <div className="text-sm ml-2 group-hover:text-white"><AiOutlineDown /></div>
                    </div>
                </div>

                {/* Profile Hidden */}
                <div className={navClick ? "hidden" : "hidden group-hover:inline absolute w-[9.2rem] h-[1rem] right-0"}>
                    <div className="card-profile px-[1.5rem] pb-[1rem] absolute">
                        {/* Card Profile */}
                        <Link to={"account"} className="parent_profile" onClick={() => navUrlClick(true)}>
                            <FaUserAlt className="icon_profile" />
                            <div className="capitalize leading-5">
                                <h3 className="text-black font-semibold">{dataAkun.user_name}</h3>
                                <span className="text-sm">classic member</span>
                            </div>
                        </Link>

                        {/* List data */}
                        <ul className="text-color-gray capitalize mt-[1rem]">
                            <Link to={"account"} className="text_list-data" onClick={() => navUrlClick(true)}>
                                <MdPersonalInjury />
                                Personal Data
                            </Link>
                            <Link to={"account/addressbook"} className="text_list-data" onClick={() => navUrlClick(true)}>
                                <FaAddressBook />
                                Address Book
                            </Link>
                            <Link to={"account/orderlist"} className="text_list-data" onClick={() => navUrlClick(true)}>
                                <AiFillShopping />
                                Order List
                            </Link>
                        </ul>

                        {/* Button Logout */}
                        <NavLink to={"/"} className="parent_logout" onClick={() => btnLogout(false)}>
                            <div className="icon-logout"><BiLogOut /></div>
                            logout
                        </NavLink>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AkunPelanggan