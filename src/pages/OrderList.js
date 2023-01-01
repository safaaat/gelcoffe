import { useState, React, useEffect, useMemo } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { IoMdArrowDropdown } from "../utils/icon";

function OrderList() {
  const dataButton = useMemo(() => ["Confirmasi", "Completed", "Cancel"], []);
  const [buttonMobile, setButtonMobile] = useState(["Completed", "Cancel"]);
  const [buttonAktif, setButtonAktif] = useState("Confirmasi");
  // const [activeFixed, setActiveFixed] = useState(false);
  const [active, setActive] = useState({ btnMobile: false });

  // useEffect(() => {
  //     const onScroll = () => {
  //         if (window.scrollY >= 139) return setActiveFixed(true);
  //         return setActiveFixed(false);
  //     }

  //     window.addEventListener("scroll", onScroll);
  //     return () => window.removeEventListener("scroll", onScroll);
  // }, [])

  const onSubmit = (data, activeMobile) => {
    setButtonAktif(data);
    onClickActiveButton(activeMobile);
  };

  const updateButtonMobile = (dataButton, buttonAktif) => {
    const filterButtonOff = dataButton.filter(data => {
      return data !== buttonAktif;
    });
    setButtonMobile(filterButtonOff);
  };

  useEffect(() => {
    updateButtonMobile(dataButton, buttonAktif);
  }, [buttonAktif, dataButton]);

  const onClickActiveButton = value => {
    console.log("bisa");
    let data = { btnMobile: value };
    setActive(prev => {
      return { ...prev, ...data };
    });
  };

  return (
    <>
      <div className="windows-out mt-0">
        <div className="border-x-[1px] w-[90%] pt-[2rem] sm:pt-[3rem] md:pt-[2.5rem] px-2 sm:px-[2rem] mx-auto border-color-gray/50">
          <div className="parent_orderlist">
            {dataButton.map((data, index) => (
              <NavLink
                key={index}
                to={`${data}`}
                className={({ isActive }) =>
                  isActive ? "btn-order-aktif" : "btn-order"
                }
                onClick={() => onSubmit(data)}
              >
                {data}
              </NavLink>
            ))}
          </div>

          {/* Link Mobile */}
          <div className="relative w-full inline-block 360:hidden z-30">
            <div className="parent_btn-mobile-orderlist relative z-20">
              <button
                className="flex items-center bg-color-primary text-white justify-between px-2 py-1 w-[7.5rem] rounded-md"
                onClick={() => onClickActiveButton(!active.btnMobile)}
              >
                {buttonAktif}
                <IoMdArrowDropdown />
              </button>
            </div>

            <div className="absolute right-0 flex justify-end -mt-2 z-10">
              <div
                className={
                  !active.btnMobile
                    ? "btn_mobile-orderlist"
                    : "btn_mobile-orderlist_active"
                }
              >
                {buttonMobile.map((data, index) => (
                  <NavLink
                    key={index}
                    to={`${data}`}
                    onClick={() => onSubmit(data, false)}
                  >
                    <p className="px-2 py-1">{data}</p>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default OrderList;
