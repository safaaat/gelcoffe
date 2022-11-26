import React from "react";

function BtnDaftarAndLogin({ showFromRegister, scrolled }) {
    return (
        <div>
            <div className="flex gap-6">
                {/* Login */}
                <button className={!scrolled ? "btn-login hover:text-color-hover hover:border-color-hover" : "btn-login hover:text-color-900 hover:border-color-900"} onClick={() => showFromRegister(true, "login")}>Login</button>
                {/* Register */}
                <button className={!scrolled ? "btn-register hover:bg-color-hover" : "btn-register hover:bg-color-900 hover:text-white"} onClick={() => showFromRegister(true, "register")}>Register</button>
            </div>
        </div >
    )
}

export default BtnDaftarAndLogin