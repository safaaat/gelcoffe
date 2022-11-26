import { React, useState, useCallback, useEffect } from "react";
import { FromAddress } from "../components/addressbook/index";
import { Api_Url } from "../utils/constants";
import axios from "axios";
import LoadingAddData from "../components/LoadingAddData";
import { AiOutlineEllipsis, IoClose } from "../utils/icon"

function AddressBook({ onOffScrollBody, loginAkunPelanggan }) {
    // Nampung Data Login
    let data = loginAkunPelanggan[0];
    // State Data Value Form
    const [dataAddress, setDataAddress] = useState({ nama: data.user_name, nomorhp: data.nomor_telp, kota: "", kecamatan: "", kodePos: "", alamatLengkap: "", catatanKurir: "" });
    // State Activasi Form
    const [active, setActive] = useState({ form: false, loading: false, btnMobile: "" });
    // State Data Api Address
    const [valueApiAddress, setValueApiAddress] = useState([]);
    // State Alamat Utama
    const [addressUtama, setAddressUtama] = useState()

    const activeFrom = (value) => {
        // State Active From
        setActive((ress) => {
            return { ...ress, ...value }
        })
        // Function Scroll Body
        onOffScrollBody(value.form)
        // Ketika Close Form, Kembalikan Value Sesuai Default
        if (value.form === false) return updateValueAddress(data);
    }

    // Update State Data Input Form
    const updateDataAddress = (newData) => {
        setDataAddress((prev) => {
            return { ...prev, ...newData }
        })
    }

    const updateValueAddress = useCallback((data) => {
        if (data.nomor_telp === undefined) return setDataAddress({ nama: data.user_name, nomorhp: "", kota: "", kecamatan: "", kodePos: "", alamatLengkap: "", catatanKurir: "" });

        return setDataAddress({ nama: data.user_name, nomorhp: data.nomor_telp, kota: "", kecamatan: "", kodePos: "", alamatLengkap: "", catatanKurir: "" });
    }, []);

    // Put Data Address
    const putOnAddress = async (value) => {
        // Active Loading
        activeFrom({ loading: true });
        // Post Api
        await axios.post(`${Api_Url}alamat`, value)
            .then(() => {
                // Close Form Address
                activeFrom({ form: false });
                // Close Loading
                activeFrom({ loading: false });
                // Get Address
                getOnAddress(loginAkunPelanggan);
            }).catch(() => {
                // Close Form Address
                activeFrom({ form: false });
                // Close Loading
                activeFrom({ loading: false });
            })
    }
    // Looping Data Address
    const loopAddress = useCallback((alamatAddress) => {
        alamatAddress.forEach((data, index) => {
            if (index === 0) return setAddressUtama(data);
        })
    }, [])

    // Get Data Address
    const getOnAddress = useCallback((value) => {
        let id = value[0].id
        axios.get(`${Api_Url}alamat?idUser=${id}`)
            .then((ress) => {
                let data = ress.data
                setValueApiAddress(data);
                loopAddress(data);
            })
    }, [loopAddress])

    useEffect(() => {
        updateValueAddress(data);
        getOnAddress(loginAkunPelanggan);
    }, [loginAkunPelanggan, updateValueAddress, data, getOnAddress])

    // Change Address Utama 
    const changeOnPilihAddress = (value) => {
        // Id Address Utama
        let idOnUtama = addressUtama.id;
        let idOffUtama = value.id

        // Ubah Data Yang Di Klick Jadi Data Address Utama
        putChangeAddress(value, idOnUtama);
        putChangeAddress(addressUtama, idOffUtama);

        // Close Btn Mobile
        acitveBtnMobile({ btnMobile: false })
    }
    // Put Data Address
    const putChangeAddress = async (value, id) => {
        let data = {
            nama: value.nama,
            nomorhp: value.nomorhp,
            kota: value.kota,
            kecamatan: value.kecamatan,
            kodePos: value.kodePos,
            alamatLengkap: value.alamatLengkap,
            catatanKurir: value.catatanKurir,
            idUser: value.idUser,
            id: id
        }

        await axios.put(`${Api_Url}alamat/${id}`, data)
            .then(() => {
                // Get Address
                getOnAddress(loginAkunPelanggan);
            })
    }
    // Function Remove Data Address
    const removeAddress = async (value) => {
        await axios.delete(`${Api_Url}alamat/${value}`)
            .then(() => {
                // Get Address
                getOnAddress(loginAkunPelanggan);
                // Close Btn Mobile
                acitveBtnMobile({ btnMobile: false })
            })
    }
    const acitveBtnMobile = (value) => {
        setActive((ress) => {
            return { ...ress, ...value }
        })
        if (value.btnMobile === false) return onOffScrollBody(value.btnMobile);
        return onOffScrollBody(true);
    }

    return (
        <>
            <div className="windows-out">
                <div className="addressbook dimensi-border">
                    <div className="parent_btn">
                        <button className="capitalize text-sm bg-color-primary py-2 px-5 text-white rounded-lg transition-all duration-300 hover:bg-color-hover-btn 360:mt-[1rem]" onClick={() => activeFrom({ form: true })}>add new address</button>
                    </div>

                    <ul className="grid gap-5 mt-[1rem]">
                        {valueApiAddress.map((data, index) => (
                            <li key={index} className={data.id === addressUtama.id ? "border-address-aktif" : "border-address"}>
                                {/* Nama Or Nomor HandPhone */}
                                <div className="flex items-center gap-1">
                                    <h3 className="font-bold text-gray-800 capitalize">{data.nama}</h3>
                                    <div className="bg-black/30 h-[.7rem] w-[1px]"></div>
                                    <p className="text-xs text-gray-400">{data.nomorhp}</p>
                                </div>

                                {/* Alamat Lengkap */}
                                <div className="mt-1">
                                    <h5 className="text-gray-900">{data.alamatLengkap}</h5>
                                    <p className="text-sm text-gray-400">{data.kecamatan} - {data.kota} - {data.kodePos}</p>
                                </div>

                                {/* Button */}
                                <div className="flex gap-3 640:gap-[2rem] mt-[2rem] items-center">
                                    <button className="btn">change address</button>
                                    <div className={data.id === addressUtama.id ? "hidden" : "hidden 414:flex gap-3 640:gap-[2rem]"}>
                                        <button className="btn hidden 768:inline" onClick={() => changeOnPilihAddress(data)}>make it the primary address</button>
                                        <button className="btn" onClick={() => removeAddress(data.id)}>delete</button>
                                    </div>
                                    {/* Icon Btn */}
                                    <div className={data.id === addressUtama.id ? "hidden" : "btn-titik"} onClick={() => acitveBtnMobile({ btnMobile: data.id })}><AiOutlineEllipsis /></div>
                                </div>

                                {/* Button Mobile */}
                                <div className={data.id === active.btnMobile ? "parent_btn-mobile-aktif" : "parent_btn-mobile"}>
                                    <div className={data.id === active.btnMobile ? "btn-mobile-address-aktif" : "btn-mobile-address"}>
                                        {/* Close */}
                                        <button className="mx-2 my-[1rem] flex items-center gap-1 text-black/70">
                                            <IoClose className="text-[1.8rem]" onClick={() => acitveBtnMobile({ btnMobile: false })} />
                                            <p className="capitalize font-bold text-[1.2rem]">other options</p>
                                        </button>
                                        {/* Btn */}
                                        <div className="grid">
                                            <button className="btn-mobile " onClick={() => changeOnPilihAddress(data)}>make it the primary address</button>
                                            <button className="btn-mobile 414:hidden" onClick={() => removeAddress(data.id)}>delete</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* FROM ADD ADDRESS */}
            {!active.form ? "" : <FromAddress activeFrom={activeFrom} loginAkunPelanggan={loginAkunPelanggan} dataAddress={dataAddress} updateDataAddress={updateDataAddress} putOnAddress={putOnAddress} />}

            {/* Loading */}
            {!active.loading ? "" : <LoadingAddData />}
        </>
    )
}

export default AddressBook