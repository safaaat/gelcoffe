import axios from "axios";
import { React, useEffect, useState, useCallback } from "react";
import { Api_Url } from "../../utils/constants";
import { IoClose, HiPlus } from "../../utils/icon";

const MapDataAddress = ({ dataAddress, onOffAddress, changeAddressUtama, loginAkunPelanggan, showFromRegister }) => {
    const checkLogin = (value) => {
        if (value.length !== 0) return onOffAddress({ form: true });
        onOffAddress({ daftarAddress: false });
        setTimeout(() => {
            showFromRegister(true, "login");
        }, 400);
    }
    return (
        <>
            <ul className="parent_address-mobile">
                {/* Map Data Address */}
                {dataAddress.map((data, index) => (
                    <li key={data.id} className={index === 0 ? "card-address border-color-primary" : "card-address border-color-gray/20"} onClick={() => changeAddressUtama(data)}>
                        <div className="content-card">
                            <h4 className="font-semibold">{data.nama}</h4>
                            <h6 className="text-xs text-color-gray">{data.nomorhp}</h6>
                            <p className="mt-2 text-sm">{data.alamatLengkap}</p>
                        </div>
                    </li>
                ))}

                {/* Add Address */}
                <div className="border-color-gray/20 w-[10rem] h-[8rem] 360:w-[12rem] 360:h-[10rem] border-[1px] rounded-xl text-color-primary transition-all duration-300 cursor-pointer hover:text-color-hover-btn" onClick={() => checkLogin(loginAkunPelanggan)}>
                    <div className="flex flex-col h-full items-center justify-center gap-2">
                        <div className="border-[1px] border-color-gray/20 rounded-full p-3">
                            <HiPlus className="text-[1.7rem]" />
                        </div>
                        <p className="font-medium text-sm w-[10rem] text-center mt-1">Add a new address</p>
                    </div>
                </div>
            </ul>
        </>
    )
}

const DaftarAddress = ({ dataAddress, onOffAddress, active, getOnAddress, loginAkunPelanggan, showFromRegister }) => {
    // Nampung State Active Form
    const [activeForm, setActiveForm] = useState([]);
    // Function Update Active
    const updateActive = useCallback((value) => {
        setActiveForm(value);
    }, [])
    useEffect(() => {
        updateActive(active.daftarAddress)
    }, [updateActive, active.daftarAddress])

    // Function Ubah Address Utama
    const changeAddressUtama = (value) => {
        // Data Address Utama
        let oldAddress = { ...dataAddress[0], id: value.id }
        // Data Address New
        let newAddress = { ...value, id: dataAddress[0].id }
        // Ubah Address New Jadi Address Utama
        putChangeAddress(dataAddress[0].id, newAddress);
        // Ubah Address Old Untuk Menjadi Tidak Address Utama
        putChangeAddress(value.id, oldAddress);
    }

    // Function Put Chenge Address Utama
    const putChangeAddress = async (id, data) => {
        await axios.put(`${Api_Url}alamat/${id}`, data)
            .then(() => {
                // Get Data Address
                getOnAddress(loginAkunPelanggan[0].id)
            })
    }
    return (
        <>
            <div className={activeForm === true ? "bg-black_daftar-address flex z-[1000]" : "bg-black_daftar-address flex delay-[350ms] opacity-0 z-[-1000]"}>
                <div className={activeForm === true ? "parent_daftar-address bottom-[0rem] delay-75" : "parent_daftar-address bottom-[-18rem] md:bottom-[0rem] md:opacity-0 md:scale-0"}>
                    <div className="w-[93%] mx-auto md:pb-3">
                        {/* Button Close */}
                        <div className="flex justify-end">
                            <button className="close" onClick={() => { onOffAddress({ daftarAddress: false }) }}>
                                <IoClose />
                            </button>
                        </div>

                        {/* Judul */}
                        <h3 className="font-semibold text-base text-center mt-2 360:text-left 360:text-lg">Where do you want to send the order?</h3>

                        {/* Text Paraf */}
                        <p className="text-xs text-center 360:text-left 360:text-sm text-color-gray">You can select the address that you have saved</p>

                        {/* Map Data Address */}
                        <div className="mt-[2rem] mb-[.5rem]">
                            <MapDataAddress dataAddress={dataAddress} onOffAddress={onOffAddress} changeAddressUtama={changeAddressUtama} loginAkunPelanggan={loginAkunPelanggan} showFromRegister={showFromRegister} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DaftarAddress