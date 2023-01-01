import { useEffect, React, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LogoPolos } from "../components/checkout";
import { NotFound } from "./Index";
import { FaLongArrowAltLeft } from '../utils/icon'
import { DisplayStatusPayment } from "../components/orderStatus/index";

const OrderStatus = ({ OnOffFooter, paymentConfirmasi, offActiveOrderStatus, updateIdConfirmasi }) => {
    const { id } = useParams();
    const [active, setActive] = useState({ acOnScroll: "scroll-default" })

    // Footer Off
    useEffect(() => {
        offActiveOrderStatus({ active: false, id: null })
        OnOffFooter("off");
    }, [OnOffFooter, offActiveOrderStatus])

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 25) return setActive({ acOnScroll: "scroll-bg-white" })
            if (window.scrollY > 8) return setActive({ acOnScroll: "fixed w-full md:relative" })
            return setActive({ acOnScroll: "scroll-default" })
        }

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [])

    return (
        <>
            <div className={paymentConfirmasi.length === 0
                ? "container_order-status justify-center"
                : "container_order-status"
            }>
                {/* Navbar Order Status */}
                <div className={paymentConfirmasi.length === 0
                    ? "parent_nav-order-status absolute top-0"
                    : "parent_nav-order-status"
                }>
                    {/* Parent Nav Pada Saat Versi Tablet And Mobile  */}
                    <div className={active.acOnScroll}>
                        <nav className="flex w-[90%] mx-auto justify-between">
                            <Link to={"/account/orderlist/confirmasi"} className="flex items-center gap-2">
                                <FaLongArrowAltLeft className="text-xl" />
                                <h5 className="capitalize font-semibold">order status</h5>
                            </Link>

                            <Link to={"/"} className="pb-3 text-color-primary hover:text-color-hover-btn transition-all duration-300">
                                <LogoPolos sizeIcon={"text-[2rem]"} sizeText={"text-[1.2rem]"} />
                            </Link>
                        </nav>
                    </div>
                </div>

                {/* Content */}
                {paymentConfirmasi.length === 0
                    ? <div className="mt-[3rem] 360:mt-[0rem]"><NotFound bgGreen={false} /></div>
                    : <DisplayStatusPayment idOrder={id} paymentConfirmasi={paymentConfirmasi} updateIdConfirmasi={updateIdConfirmasi} />
                }

                {/* Footer Order Status */}
                <footer className={paymentConfirmasi.length === 0
                    ? "footer-order absolute"
                    : "footer-order mt-[2rem] md:absolute md:mt-0"
                }>
                    <span className="flex justify-center gap-1 text-color-gray">
                        © 2022,
                        <button className="hover:text-color-primary trasitional duration-300">
                            <a href="https://safaaat.github.io/" target={"_blank"} rel="noreferrer">
                                Muhammad Safaat
                            </a>
                        </button>
                    </span>
                </footer>
            </div>
        </>
    )
}

export default OrderStatus