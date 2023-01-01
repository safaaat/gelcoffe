import { React, useState, useEffect } from "react";
import {
  BtnDaftarAndLogin,
  InputNav,
  Keranjang,
  LogoNav,
  AkunPelanggan,
} from "./navbar/index";
import { Outlet } from "react-router-dom";
import { NavMobile } from "./navbar/NavMobile";
import SendAddress from "./cart/SendAddress";
import DaftarAddress from "./cart/DaftarAddress";
import AddAddress from "./cart/AddAddress";

function Navbar({
  showFromRegister,
  loginAkunPelanggan,
  loginAkun,
  keranjangs,
  clearProductBag,
  dataAddress,
  getOnAddress,
  onOffNavbar,
  OnOffFooter,
  onOffScrollBody,
}) {
  // State Scroll
  const [scrolled, setScrolled] = useState(false);
  const [backgroundHover, setBackgroundHover] = useState(false);
  // State Active Form
  const [active, setActive] = useState({ form: false, daftarAddress: false });

  useEffect(() => {
    // Function Scroll Untuk Aktif Background green NavBar
    const onScroll = () => {
      if (window.scrollY > 15) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Function Hover Background Black, NavBar Basket.
  const backgroundEnter = value => {
    setBackgroundHover(value);
  };

  // Function Untuk Menghilangkan hover black pada saat logout
  const clearBgBlack = value => {
    setBackgroundHover(value);
  };

  // On Off Form Add Address
  const onOffAddress = value => {
    setActive(prev => {
      return { ...prev, ...value };
    });

    if (value.daftarAddress !== undefined)
      return onOffScrollBody(value.daftarAddress);
  };

  // Footer On
  useEffect(() => {
    OnOffFooter("on");
  }, [OnOffFooter]);

  return (
    <div className="relative">
      {/* navBar */}
      <div className={onOffNavbar === "on" ? "inline" : "hidden"}>
        <nav className={scrolled ? "nav_scroll" : "nav_normal"}>
          <div className="w-full 2xl:w-[84.4rem] mx-auto">
            <div className="content-nav">
              {/* Logo Navbar */}
              <LogoNav />

              {/* From Input */}
              <div className="mt-[9px] 360:mt-[7px] md:mt-[9px] w-full">
                <InputNav />
              </div>

              {/* Keranjang */}
              <div
                className="hidden lg:inline bg-black w-[4.1rem] mx-[2rem] rounded-[.8rem]"
                onMouseEnter={() => backgroundEnter(true)}
                onMouseLeave={() => backgroundEnter(false)}
              >
                <Keranjang
                  keranjangs={keranjangs}
                  clearProductBag={clearProductBag}
                />
              </div>

              {/* List */}
              <div className="h-[2rem] w-[2px] bg-white mr-[2rem] hidden lg:inline"></div>

              <div className="hidden lg:inline">
                {/* Button Login and Daftar */}
                {loginAkunPelanggan.length > 0 ? (
                  // Profile User
                  <div
                    onMouseEnter={() => backgroundEnter(true)}
                    onMouseLeave={() => backgroundEnter(false)}
                  >
                    <AkunPelanggan
                      loginAkunPelanggan={loginAkunPelanggan}
                      loginAkun={loginAkun}
                      clearBgBlack={clearBgBlack}
                    />
                  </div>
                ) : (
                  // Button Register Login
                  <BtnDaftarAndLogin
                    showFromRegister={showFromRegister}
                    scrolled={scrolled}
                  />
                )}
              </div>

              {/* Send Address */}
              <div
                className={
                  scrolled
                    ? "parent_send-address text-white bg-color-hover-btn"
                    : "parent_send-address text-white"
                }
              >
                <SendAddress
                  dataAddress={dataAddress}
                  onOffAddress={onOffAddress}
                />
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* NavBar Mobile */}
      <NavMobile
        keranjangs={keranjangs}
        loginAkunPelanggan={loginAkunPelanggan}
        showFromRegister={showFromRegister}
      />

      {/* Background bag */}
      <div
        className={
          !backgroundHover
            ? "hidden"
            : "bg-black/80 w-full h-screen fixed top-0 z-[40]"
        }
      ></div>

      {/* Daftar Address */}
      <DaftarAddress
        dataAddress={dataAddress}
        loginAkunPelanggan={loginAkunPelanggan}
        onOffAddress={onOffAddress}
        active={active}
        getOnAddress={getOnAddress}
        showFromRegister={showFromRegister}
      />

      {/* From Address */}
      {!active.form ? (
        ""
      ) : (
        <AddAddress
          loginAkunPelanggan={loginAkunPelanggan}
          onOffAddress={onOffAddress}
          getOnAddress={getOnAddress}
        />
      )}
      <Outlet />
    </div>
  );
}

export default Navbar;
