import React from "react";
import { SetEmail, SocialMedia, Useful, Account } from "./footer/index";

function Footer() {
    return (
        <footer>
            <div className="w-full 2xl:w-[84.4rem] bg-gray-900 mx-auto pb-[4.5rem] lg:pb-0 relative">
                <div className="py-[3rem] w-[90%] mx-auto">
                    <div className="grid 880:grid-cols-[75%_25%]">
                        <div className="grid sm:grid-cols-[60%_40%] 880:grid-cols-[72%_28%]">
                            <SetEmail />
                            <SocialMedia />
                        </div>
                        <div className="sm:flex sm:justify-end sm:gap-[3rem] 880:grid 880:grid-cols-2 640:mt-[2.5rem] 880:mt-0">
                            <Useful />
                            <Account />
                        </div>
                    </div>
                </div>

                <span className="flex gap-1 justify-center py-1 text-color-gray">
                    © 2022,
                    <button className="hover:text-gray-300 transition-all duration-500">
                        <a href="https://safaaat.github.io/" target={"_blank"} rel="noreferrer">
                            Muhammad Safaat
                        </a>
                    </button>
                </span>
            </div>
        </footer>
    )
}

export default Footer