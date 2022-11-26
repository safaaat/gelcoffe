import React from "react";
import { Link } from "react-router-dom";

function ViewBag() {
    return (
        <div className="flex justify-end gap-[1.5rem]">
            {/* Line */}
            <div className="grid">
                <span className="bg-gray-400 w-[1px] h-full"></span>
            </div>
            <Link to={"/cart"} className="flex justify-end">
                <button className="capitalize hover:bg-color-hover/30 px-5 py-1 rounded-lg">view bag</button>
            </Link>
        </div>
    )
}

export default ViewBag