import { React, useCallback, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

function UserAccount({ updateOnOffNavbar, loginAkun }) {
    const changeOnOffNavbar = useCallback(() => {
        return updateOnOffNavbar("on");
    }, [updateOnOffNavbar]);

    useEffect(() => {
        changeOnOffNavbar();
    }, [changeOnOffNavbar]);

    const btnLogout = () => {
        loginAkun([])
    }

    return (
        <>
            <div className="w-full 2xl:w-[84.3rem] mx-auto">
                <div className="bg-green"></div>

                <div className="w-[90%] mx-auto">
                    <div className="border border-black/20 py-[1rem] rounded-t-xl mt-[2rem] flex items-center justify-center gap-[10%] w-full">
                        <div className="relative text-center">
                            <NavLink
                                to="/account"
                                className={({ isActive }) => (isActive
                                    ? "btn-nav_account-aktif"
                                    : "btn-nav_account"
                                )}
                                end>
                                Personal Data
                            </NavLink>
                        </div>
                        <div className="relative text-center">
                            <NavLink
                                to="addressbook"
                                className={({ isActive }) => (isActive
                                    ? "btn-nav_account-aktif"
                                    : "btn-nav_account"
                                )}>
                                Address Book
                            </NavLink>
                        </div>
                        <div className="relative text-center">
                            <NavLink
                                to="orderlist"
                                className={({ isActive }) => (isActive
                                    ? "btn-nav_account-aktif "
                                    : "btn-nav_account"
                                )}>
                                Order List
                            </NavLink>
                        </div>
                    </div>
                </div>

                {/* Button Logout */}
                <div className="inline lg:hidden absolute bottom-[-3rem] w-[100%]">
                    <NavLink to={"/"} className="parent_logout w-[90%] mx-auto" onClick={() => btnLogout()}>
                        <div className="icon-logout"><BiLogOut /></div>
                        logout
                    </NavLink>
                </div>
                <Outlet />
            </div>
        </>
    )
}

export default UserAccount

