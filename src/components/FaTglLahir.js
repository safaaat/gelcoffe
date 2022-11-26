import React from "react"
import { useState } from "react";
import { InputTglLahir } from "../components/personalData/index";
// Function Data Tanggal, Bulan, Tahun.
import { lopTanggal, dataBulan, dataTahun } from "../utils/faPerData";
import { IoClose } from "../utils/icon";

const FaTglLahir = ({ klikBtn, activeAlert, loginAkunPelanggan, putPelangganById }) => {
    const [inputTglLahir, setInputTglLahir] = useState({ tanggal: "", bulan: "", tahun: "", });

    const updateDataInputTglLahir = (newData) => {
        setInputTglLahir(prev => {
            return { ...prev, ...newData }
        })
    }

    const submitAddTanggalLahir = () => {
        // menampung data tanggal Yang Mau di update
        let tanggal_lahir = `${inputTglLahir.tanggal}-${inputTglLahir.bulan}-${inputTglLahir.tahun}`;
        // Variable Data Login Akun
        let akunLogin = loginAkunPelanggan[0];
        // Add Tanggal Lahir Ke Dalam Objek Data Login Akun
        let dataUser = { ...akunLogin, tanggal_lahir }

        // Jika Nilai Input Kosong Kirim Alert
        if (inputTglLahir.tanggal === "" || inputTglLahir.bulan === "" || inputTglLahir.tahun === "") return activeAlert(true);
        // Jika Nilai Input Tidak Kosong Kirim data ke Function PutPelangganById
        return putPelangganById(akunLogin, dataUser);
    }

    return (
        <>
            <div className="relative">
                <div className="fixed top-[20%] 360:top-[30%] left-0 w-full z-[31]">
                    <div className="bg-white w-[95%] 360:w-[90%] sm:w-[30rem] mx-auto grid justify-items-center gap-[1rem] py-[1.5rem] px-[1rem] rounded-xl relative">
                        {/* Btn Close */}
                        <button className="absolute right-0 top-0 text-2xl m-1 transition-all duration-300 hover:text-red-500" onClick={() => klikBtn(false)}>
                            <IoClose />
                        </button>

                        <h3 className="font-semibold text-2xl">Add Date Of Birth</h3>
                        <p className="text-center text-gray-500">You can only set your birth date once.
                            <br />
                            Make sure the date of birth is correct.
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                            <InputTglLahir valueLi={lopTanggal()} valueBtn={"Tanggal"} cssValue={"tanggal"} updateData={updateDataInputTglLahir} />
                            <InputTglLahir valueLi={dataBulan()} valueBtn={"Bulan"} cssValue={"bulan"} updateData={updateDataInputTglLahir} />
                            <InputTglLahir valueLi={dataTahun()} valueBtn={"Tahun"} cssValue={"tanggal"} updateData={updateDataInputTglLahir} />
                        </div>
                        <button className="capitalize bg-color-primary hover:bg-color-hover-btn transition-all duration-300 px-[2rem] py-[.5rem] rounded-xl text-white  360:mt-[1rem] font-semibold" onClick={() => submitAddTanggalLahir()}>
                            save
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FaTglLahir