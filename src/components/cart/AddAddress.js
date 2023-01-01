import axios from "axios";
import { useCallback } from "react";
import { React, useEffect, useState } from "react";
import { Api_Url } from "../../utils/constants";
import { IoClose } from "../../utils/icon";
import InputForm from "../addressbook/InputForm";

const AddAddress = ({ loginAkunPelanggan, onOffAddress, getOnAddress, showFromRegister }) => {
    // Nampung Data Login
    let data = loginAkunPelanggan[0];
    // State Data Value Form
    const [dataAddress, setDataAddress] = useState({ nama: data.user_name, nomorhp: "", kota: "", kecamatan: "", kodePos: "", alamatLengkap: "", catatanKurir: "" });
    // Active Button Save
    const [active, setActive] = useState(false);

    // Update State Data Input Form
    const updateDataAddress = (newData) => {
        setDataAddress((prev) => {
            return { ...prev, ...newData }
        })
    }

    const defaultAddress = useCallback(() => {
        // Jika Data Nomor Hp User Kosong, Maka Value Nomor_hp = Kosong
        if (data.nomor_telp === undefined) return setDataAddress({ nama: data.user_name, nomorhp: "", kota: "", kecamatan: "", kodePos: "", alamatLengkap: "", catatanKurir: "" });

        // Jika Data Nomor Hp Ada, Maka Value Nomor_Hp = Data.nomor_telp 
        return setDataAddress({ nama: data.user_name, nomorhp: data.nomor_telp, kota: "", kecamatan: "", kodePos: "", alamatLengkap: "", catatanKurir: "" });
    }, [data.user_name, data.nomor_telp])

    // Check Value Data Login, Apakah Ada Nomor_Hp
    useEffect(() => {
        defaultAddress()
    }, [defaultAddress])

    // Submit Address
    const handleSubmit = (event) => {
        // Menghentikan Refresh Browser
        event.preventDefault()
        // Function Check Value Input, Apakah Ada Yang Kosong Atau Tidak.
        cekValueInput(dataAddress);

        // Id User Yang Sedang Login
        let idUser = data.id;
        // Variable Untuk Menggabungkan Data Address Dengan Id Login User
        let joinAddress = ({ ...dataAddress, idUser });
        // Function Post Data Address
        postDataAddress(joinAddress, idUser);
    }

    // Function Check Value Input
    const cekValueInput = (dataAddress) => {
        if (dataAddress.nama.length < 3 || dataAddress.nomorhp.length < 10 || dataAddress.kota.length < 4 || dataAddress.kecamatan.length < 4 || dataAddress.kodePos.length < 5 || dataAddress.alamatLengkap.length < 15) return setActive(false);
        return setActive(true);
    }
    // Check Value Input
    useEffect(() => {
        cekValueInput(dataAddress)
    }, [dataAddress])

    // Fucntion Post Data Address
    const postDataAddress = async (dataAddress, idUser) => {
        if (active === true) {
            await axios.post(`${Api_Url}alamat`, dataAddress)
                .then(() => {
                    // Close Form
                    onOffAddress({ form: false });
                    // Function Get Address
                    getOnAddress(idUser);
                })
        }
    }

    return (
        <>
            <div className="relative">
                <div className="fixed top-0 left-0 w-full 2xl:w-[84.4rem] h-screen 2xl:h-[40rem] flex justify-center items-center z-[1002] bg-black/50">
                    <div className="bg-white mx-[1rem] w-[50rem] h-[27rem] 360:h-[31rem] rounded-2xl overflow-hidden">
                        <div className="relative">
                            {/* Button Close */}
                            <button className="absolute right-0 text-[1.8rem] mr-[1rem] transition-all duration-300 hover:text-red-500" onClick={() => onOffAddress({ form: false })}><IoClose /></button>
                            {/* Text Judul */}
                            <h1 className="text-2xl 360:text-3xl font-semibold text-center my-[1rem] text-black/80">Add Address</h1>
                            {/* Line */}
                            <div className="w-full h-[1px] bg-black/30"></div>
                        </div>

                        {/* From Input Address */}
                        <form onSubmit={handleSubmit}>
                            <div className="px-[5%] text-lgcapitalize font-semibold pt-[1.9rem] overflow-auto h-[26rem]">
                                {/* Judul */}
                                <h3>Complete address details</h3>
                                {/* Form */}
                                <div className="pt-[2rem] grid gap-[2.5rem]">
                                    <InputForm data={{ judul: "Recipient's Name", code: 1 }} updateDataAddress={updateDataAddress} maxJumlah={30} valueInput={dataAddress.nama} inputLength={Number(dataAddress.nama.length)} />
                                    <InputForm data={{ judul: "Number Phone", code: 2 }} updateDataAddress={updateDataAddress} maxJumlah={16} valueInput={dataAddress.nomorhp} inputLength={Number(dataAddress.nomorhp.length)} />
                                    <InputForm data={{ judul: "City", code: 3 }} updateDataAddress={updateDataAddress} maxJumlah={25} valueInput={dataAddress.kota} inputLength={Number(dataAddress.kota.length)} />
                                    <InputForm data={{ judul: "Subdistrict", code: 4 }} updateDataAddress={updateDataAddress} maxJumlah={35} valueInput={dataAddress.kecamatan} inputLength={Number(dataAddress.kecamatan.length)} />
                                    <InputForm data={{ judul: "Postal Code", code: 5 }} updateDataAddress={updateDataAddress} maxJumlah={5} valueInput={dataAddress.kodePos} inputLength={Number(dataAddress.kodePos.length)} />
                                    <InputForm data={{ judul: "Complete Address", code: 6 }} updateDataAddress={updateDataAddress} maxJumlah={200} valueInput={dataAddress.alamatLengkap} inputLength={Number(dataAddress.alamatLengkap.length)} />
                                    <InputForm data={{ judul: "Courier Note (optional)", code: 7 }} updateDataAddress={updateDataAddress} maxJumlah={50} valueInput={dataAddress.catatanKurir} inputLength={Number(dataAddress.catatanKurir.length)} />
                                </div>
                                {/* Button Submit */}
                                <div className="w-full text-center mt-[3rem] mb-[1rem]">
                                    <button className={!active ? "btn_submit-address" : "btn_submit-address-aktif"}>Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddAddress