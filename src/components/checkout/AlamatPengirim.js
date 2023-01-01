import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaAddressBook, RiArrowRightSFill } from "../../utils/icon";
import AddAddress from "../cart/AddAddress";
import DaftarAddress from "../cart/DaftarAddress";

const AlamatPengirim = ({ dataAddress, loginAkunPelanggan, getOnAddress, onOffScrollBody }) => {
    const [addressUtama, setAddressUtama] = useState(dataAddress[0]);
    const [active, setActive] = useState({ form: false, daftarAddress: false });

    const updateAddressUtama = useCallback((value) => {
        setAddressUtama(value);
    }, [])

    useEffect(() => {
        updateAddressUtama(dataAddress[0])
    }, [dataAddress, updateAddressUtama])

    const onOffAddress = (value) => {
        setActive((prev) => {
            return { ...prev, ...value }
        })

        // Function untuk On Off Scroll
        if (value.daftarAddress !== undefined) return onOffScrollBody(value.daftarAddress)
    }

    return (
        <>
            <div className="text-color-gray flex items-center gap-2">
                <FaAddressBook />
                <p className="capitalize">return address</p>
            </div>

            <div className="shadow-[0px_0px_5px_0px] shadow-color-gray/50 px-[1rem] py-[.5rem] rounded-lg mt-2">
                <div className="overflow-hidden flex items-center justify-between">
                    <div className="w-[15.8rem] 360:w-[17.8rem] 390:w-[19rem] 412:w-[21rem] sm:w-[90%] overflow-hidden">
                        <div className="flex items-center gap-2 text-color-gray">
                            <h3 className="font-semibold text-black text-lg capitalize">{addressUtama.nama}</h3>
                            <span>|</span>
                            <p>{addressUtama.nomorhp}</p>
                        </div>
                        <p className="mt-3 overflow-hidden">{addressUtama.alamatLengkap}</p>
                        <div className="text-color-gray sm:flex sm:items-center">
                            <p>{addressUtama.kota},</p>
                            <p className="">{addressUtama.kecamatan},</p>
                            <p>{addressUtama.kodePos}</p>
                        </div>
                    </div>
                    <button className="text-2xl 500:text-[2rem] text-color-primary hover:text-color-hover-btn" onClick={() => onOffAddress({ daftarAddress: true })}>
                        <RiArrowRightSFill className="mr-[-.5rem]" />
                    </button>
                </div>
            </div>

            <DaftarAddress dataAddress={dataAddress} onOffAddress={onOffAddress} loginAkunPelanggan={loginAkunPelanggan} active={active} getOnAddress={getOnAddress} onOffScrollBody={onOffScrollBody} />

            {!active.form ? "" : <AddAddress loginAkunPelanggan={loginAkunPelanggan} getOnAddress={getOnAddress} onOffAddress={onOffAddress} />}
        </>
    )
}

export default AlamatPengirim