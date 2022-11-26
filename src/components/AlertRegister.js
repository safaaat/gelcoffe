import React from "react"

function AlertRegister({ confimasiRegister, setAlertRegister }) {

    const alertConfirmasi = () => {
        const confirmasi = []
        setAlertRegister(confirmasi);
    }

    return (
        <div>
            <div onClick={alertConfirmasi} className="fixed w-full h-screen z-50 bg-black/10 left-0 top-0 grid justify-items-center items-center">
                <div className="content_alert-register">
                    <h3 className="text-xl font-semibold pt-3">{confimasiRegister.user_name}</h3>
                    <p className="capitalize pt-6">you have successfully registration</p>
                    <div className="flex justify-end mr-7 w-full">
                        <button className="bg-color-primary text-white py-1 px-3 capitalize rounded-md ring-4 ring-color-primary/30 hover:ring-color-primary/10 hover:bg-color-hover transition-all duration-300 mt-7" onClick={alertConfirmasi}>ok</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlertRegister