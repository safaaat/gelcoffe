import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { GiNotebook } from "../../utils/icon";
import { totalHargaBag } from "../../utils/totalSemuaBag";
import { changeToRp } from "../../utils/confertToRp";

const DetailPesanan = ({ productCheckOut, onSubmit }) => {
    const [totalHarga, setTotalHarga] = useState(0);
    const [totalPembayaran, setTotalPembayaran] = useState(totalHarga + 9000);

    const updateTotalHarga = useCallback((value) => {
        let harga = totalHargaBag(value);
        setTotalHarga(harga);
    }, [])
    useEffect(() => {
        updateTotalHarga(productCheckOut)
        setTotalPembayaran(totalHarga + 9000)
    }, [productCheckOut, updateTotalHarga, totalHarga])

    return (
        <>
            <div className="flex items-center text-color-gray gap-1">
                <GiNotebook className="text-[1.2rem]" />
                <p>Order Details</p>
            </div>

            <div className="shadow-[0px_0px_5px_0px] shadow-color-gray/50 rounded-md py-2 text-gray-500 mt-2 mb-[5rem] sm:w-[94%]">
                <div className="px-4">
                    <div className="flex items-center justify-between">
                        <p className="capitalize">total price :</p>
                        <span>Rp{changeToRp(totalHarga)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="capitalize">shipping cost :</p>
                        <span>Rp9.000</span>
                    </div>
                </div>

                <div className="bg-color-gray/20 w-full h-[1px] my-3"></div>

                <div className="px-4">
                    <div className="flex items-center justify-between font-semibold">
                        <p className="capitalize text-black">total payment :</p>
                        <span className="text-color-primary">Rp{changeToRp(totalPembayaran)}</span>
                    </div>
                    <button className="bg-color-primary w-full py-[.5rem] rounded-lg text-white capitalize font-bold mt-[1rem] hover:bg-color-hover-btn transition-all duration-300 hidden sm:inline" onClick={() => onSubmit(totalHarga, 9000)}>
                        lanjut
                    </button>
                </div>
            </div>

            {/* Total Pembayaran Mobile */}
            <div className="fixed bottom-0 w-full left-0 px-4 py-2 bg-white shadow-[0px_-1px_5px_0px] shadow-color-gray/50 inline sm:hidden">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 font-semibold">
                        <p className="capitalize text-black">total payment :</p>
                        <span className="text-color-primary">Rp{changeToRp(totalPembayaran)}</span>
                    </div>
                    <button className="bg-color-primary py-[.5rem] px-[1rem] 360:px-[1.5rem] rounded-lg text-white capitalize font-bold hover:bg-color-hover-btn transition-all duration-300" onClick={() => onSubmit(totalHarga, 9000)}>
                        lanjut
                    </button>
                </div>
            </div>
        </>
    )
}

export default DetailPesanan