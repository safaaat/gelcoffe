import axios from "axios";
import { useEffect } from "react";
import { useCallback } from "react";
import { React, useState } from "react";
import { Api_Url } from "../../utils/constants";
import { IoClose } from "../../utils/icon";
// import { Input } from "./index";
import InputForm from "./InputForm";

const FromAddress = ({ activeFrom, dataAddress, updateDataAddress, loginAkunPelanggan, putOnAddress, changeAddress, getOnAddress }) => {
    const [activeSubmit, setActiveSubmit] = useState(false)

    const handleSaveOrEdit = (value) => {
        if (value === false) return handleOnAddress
        return handleChangeAddress
    }

    const handleOnAddress = (event) => {
        event.preventDefault()
        // Id User Yang Sedang login
        let idUser = loginAkunPelanggan[0].id
        // Menggabungkan Data Input Address dengan Id User
        let data = { ...dataAddress, idUser }

        if (activeSubmit === true) return putOnAddress(data);
    }

    const updateActiveSubmit = useCallback((value) => {
        // Jika Semua Input Kosong
        if (value.nama.length < 3 || value.nomorhp.length < 12 || value.kota.length < 4 || value.kecamatan.length < 4 || value.kodePos.length < 5 || value.alamatLengkap.length < 15) return setActiveSubmit(false);

        return setActiveSubmit(true);
    }, [])

    useEffect(() => {
        updateActiveSubmit(dataAddress);
    }, [dataAddress, updateActiveSubmit])

    // Function Put Change Address
    const putChangeAddress = (data, id) => {
        // Active Loading
        activeFrom({ loading: true });
        axios.put(`${Api_Url}alamat/${id}`, data)
            .then(() => {
                // Memanggil Data Address
                getOnAddress(loginAkunPelanggan);
                // Off Loading
                activeFrom({ loading: false });
                // Close Form Address
                activeFrom({ form: false })
            }).catch((err) => {
                // Off Loading
                activeFrom({ loading: false });
                // Close Form Address
                activeFrom({ form: false })
                console.log(err)
            })
    }

    const handleChangeAddress = (event) => {
        event.preventDefault()

        // Nampung Nilai Value Address Yang Ingin Di Edit
        let data = dataAddress
        let id = dataAddress.id

        // Delete Objek Id
        delete data.id

        // Function Put Change Address
        if (activeSubmit === true) return putChangeAddress(data, id);
    }

    return (
        <>
            <div className="relative">
                <div className="fixed top-0 w-full 2xl:w-[84.4rem] h-screen 2xl:h-[40rem] flex justify-center items-center z-50 bg-black/50">
                    <div className="bg-white mx-[1rem] w-[50rem] h-[27rem] 360:h-[31rem] rounded-2xl overflow-hidden">
                        <div className="relative">
                            {/* Button Close */}
                            <button className="absolute right-0 text-[1.8rem] mr-[1rem] transition-all duration-300 hover:text-red-500" onClick={() => activeFrom({ form: false })}><IoClose /></button>
                            {/* Text Judul */}
                            <h1 className="text-2xl 360:text-3xl font-semibold text-center my-[1rem] text-black/80">Add Address</h1>
                            {/* Line */}
                            <div className="w-full h-[1px] bg-black/30"></div>
                        </div>

                        {/* From Input Address */}
                        <form onSubmit={handleSaveOrEdit(changeAddress.buttonActive)}>
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

                                {changeAddress.buttonActive === false
                                    ? (
                                        // Button Submit Save
                                        <div className="w-full text-center mt-[3rem] mb-[1rem]">
                                            <button className={!activeSubmit ? "btn_submit-address" : "btn_submit-address-aktif"} onSubmit={handleOnAddress}>Save</button>
                                        </div>
                                    )
                                    : (
                                        // Button Submit Edit
                                        <div className="w-full text-center mt-[3rem] mb-[1rem]">
                                            <button className={!activeSubmit ? "btn_submit-address" : "btn_submit-address-aktif"} onSubmit={handleChangeAddress}>Edit</button>
                                        </div>
                                    )
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FromAddress