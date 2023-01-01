import React from "react";
import { Link } from "react-router-dom";

function Account() {
    return (
        <div className="mt-[1.5rem] 500:mt-[2rem] md:mt-0 md:text-end">
            <h3 className="footer_judul">Account</h3>
            <div className="mt-[.5rem] 500:mt-[1rem] md:mt-[1.5rem] text-color-gray grid justify-items-start md:justify-items-end gap-1">
                <Link to={"account"} className="capitalize transition-all duration-500 hover:text-color-hover">my account</Link>
                <Link to={"category"} className="capitalize transition-all duration-500 hover:text-color-hover">Product</Link>
                <Link to={"cart"} className="capitalize transition-all duration-500 hover:text-color-hover">cart</Link>
            </div>
        </div>
    )
}

export default Account