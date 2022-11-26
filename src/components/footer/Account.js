import React from "react";

function Account() {
    return (
        <div className="mt-[2rem] md:mt-0 md:text-end">
            <h3 className="footer_judul">Account</h3>
            <div className="mt-[1rem] md:mt-[1.5rem] text-color-gray grid justify-items-start md:justify-items-end gap-1">
                <button className="capitalize transition-all duration-500 hover:text-color-hover">my account</button>
                <button className="capitalize transition-all duration-500 hover:text-color-hover">cart</button>
                <button className="capitalize transition-all duration-500 hover:text-color-hover">checkout</button>
            </div>
        </div>
    )
}

export default Account