import { React, useState, useEffect } from "react";
import { IoClose } from "../../utils/icon";

const AddHandphone = ({ klikBtn, putPelangganById, loginAkunPelanggan }) => {
    const [inputValue, setInputValue] = useState("");
    const [validasiInput, setValidasiInput] = useState({ boolean: false, text: "", });

    useEffect(() => {
        const cekNomorTelp = () => {
            let nomorTelp = loginAkunPelanggan[0].nomor_telp;

            if (nomorTelp === undefined) return setInputValue("");
            if (nomorTelp !== undefined) return setInputValue(nomorTelp);
        }

        cekNomorTelp();
    }, [loginAkunPelanggan])

    const handleInput = (e) => {
        const formattedNumber = formatPhoneNumber(e.target.value);
        setInputValue(formattedNumber);
    }

    const formatPhoneNumber = (value) => {
        if (!value) return value;
        let phoneNumber = value.match(/\d{1,4}/g);
        phoneNumber = phoneNumber.join(" ");

        let phoneNumberLength = phoneNumber.length;

        if (phoneNumberLength > 1 && phoneNumberLength < 12) {
            setValidasiInput({ boolean: true, text: "Nomor ponsel minimal 10", })
            return phoneNumber;
        }

        if (phoneNumberLength >= 12) {
            setValidasiInput({ boolean: false, text: "Nomor ponsel minimal  10", })
            return `${phoneNumber.slice(0, 16)}`;
        }

        setValidasiInput({ boolean: false, text: "Nomor ponsel minimal  10", })
        return phoneNumber;
    }

    const submitSave = (value) => {
        const loginAkun = loginAkunPelanggan[0];
        const nomor_telp = value;

        const dataPut = { ...loginAkun, nomor_telp };

        if (nomor_telp.length === 0) return setValidasiInput({ boolean: true, text: "Nomor ponsel harus di isi", });

        if (nomor_telp.length >= 12) {
            putPelangganById(loginAkun, dataPut);
        }
    }

    return (
        <>
            <div className="relative">
                <div className="fixed top-[23%] 360:top-[30%] left-0 w-full z-[31]">
                    <div className="bg-white w-[90%] sm:w-[30rem] mx-auto grid justify-items-center gap-[1rem] py-[1.5rem] px-[1rem] rounded-xl relative">
                        {/* Btn Close */}
                        <button className="absolute right-0 top-[.5rem] text-2xl m-1 transition-all duration-300 hover:text-red-500" onClick={() => klikBtn(false)}>
                            <IoClose />
                        </button>

                        <h3 className="font-semibold text-2xl capitalize">{loginAkunPelanggan[0].nomor_telp === undefined ? "Add phone number" : "Edit phone number"}</h3>
                        <p className="text-center text-gray-500">
                            Please enter phone number
                        </p>

                        {!validasiInput.boolean ? ""
                            : <div className="relative w-full flex justify-center"><p className="absolute top-[.5rem] text-sm text-red-500">{validasiInput.text}</p></div>
                        }

                        <div className="parent_number">
                            <input className="bg-color-gray/30 rounded-lg py-1 px-2 focus:ring-color-primary focus:outline-none focus:ring-2" onChange={(e) => handleInput(e)} value={inputValue} />
                        </div>

                        <button className="capitalize bg-color-primary hover:bg-color-hover-btn transition-all duration-300 px-[2rem] py-[.5rem] rounded-xl text-white mt-[1rem] font-semibold" onClick={() => submitSave(inputValue)}>
                            save
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddHandphone