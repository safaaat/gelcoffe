import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillHome, BiCategory, BsFillBagCheckFill, FaUserAlt } from "../../utils/icon";
import { totalSemuaBag } from "../../utils/totalSemuaBag";

const BtnLogin = ({ loginAkunPelanggan }) => {
    if (loginAkunPelanggan.length > 0) return <NavLink to='account' className={({ isActive }) => (isActive ? "nav-mobile-aktif text-[1.6rem]" : "nav-mobile text-[1.6rem]")}><FaUserAlt /><p className="text_nav-mobile">account</p></NavLink>
    if (loginAkunPelanggan.length === 0) return <NavLink className="nav-mobile text-[1.6rem]" ><FaUserAlt /><p className="text_nav-mobile">account</p></NavLink >
}

export const NavMobile = ({ keranjangs, loginAkunPelanggan, showFromRegister }) => {
    // Function untuk Check apakah user sudah melakukan login atau belom.
    const checkLogin = (value) => {
        const account = value.length;
        // jika belom login, form login akan aktif.
        if (account === 0) {
            return showFromRegister(true, "login");
        }
    }
    return (
        <nav className="parent_nav-mobile">
            <ul className="text-gray-600 flex justify-between w-[90%] 2xl:w-[84.4rem] mx-auto">
                <NavLink
                    to={'/'}
                    className={({ isActive }) => (isActive
                        ? "nav-mobile-aktif text-[1.6rem]"
                        : "nav-mobile text-[1.6rem]")
                    }
                    end>
                    <AiFillHome />
                    <p className="text_nav-mobile">home page</p>
                </NavLink>
                <NavLink
                    to="category"
                    className={({ isActive }) => (isActive
                        ? "nav-mobile-aktif text-[1.6rem]"
                        : "nav-mobile text-[1.6rem]")
                    }
                >
                    <BiCategory />
                    <p className="text_nav-mobile">Category</p>
                </NavLink>
                <NavLink
                    to="cart"
                    className={({ isActive }) => (isActive
                        ? "nav-mobile-aktif text-[1.6rem]"
                        : "nav-mobile text-[1.6rem]")
                    }
                >
                    <p className="text-base absolute z-10 bg-red-600 px-2 rounded-full -right-3 text-white">{totalSemuaBag(keranjangs)}</p>
                    <BsFillBagCheckFill />
                    <p className="text_nav-mobile">basket</p>
                </NavLink>

                <button onClick={() => checkLogin(loginAkunPelanggan)}>
                    <BtnLogin loginAkunPelanggan={loginAkunPelanggan} />
                </button>
            </ul>
        </nav>
    )
}
