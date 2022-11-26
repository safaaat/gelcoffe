import React from "react";
import { useState } from "react";
import { IoClose, ImMan, ImWoman } from "../../utils/icon";
import RadioBtn from "./RadioBtn";

const AddGender = ({ klikBtn, loginAkunPelanggan, putPelangganById }) => {
    const [gender, setGender] = useState("male");

    const addGender = (value) => {
        setGender(value);
    }

    const submitSave = () => {
        // menampung data jenis kelamin.
        let jenis_kelamin = gender;
        // menampung data akun yang sedang login.
        let akunLogin = loginAkunPelanggan[0];
        // menggambungkan objek akun dan jenis kelamin.
        let dataPut = { ...akunLogin, jenis_kelamin }
        // mengirimkan data akunlogin dan data jenis kelamin yang mau di masukan ke data base.
        putPelangganById(akunLogin, dataPut);
    }

    return (
        <>
            <div className="relative">
                <div className="fixed top-[21%] 360:top-[30%] left-0 w-full z-[31]">
                    <div className="bg-white w-[90%] sm:w-[30rem] mx-auto grid justify-items-center gap-[.7rem] 360:gap-[1rem] py-[1.5rem] px-[1rem] rounded-xl relative">
                        {/* Btn Close */}
                        <button className="absolute right-0 top-0 text-2xl m-1 transition-all duration-300 hover:text-red-500" onClick={() => klikBtn(false)}>
                            <IoClose />
                        </button>

                        <h3 className="font-semibold text-2xl">Add Gender</h3>
                        <p className="text-center text-gray-500">
                            You can only change gender data 1 more time.
                            <br />
                            Make sure the data is correct
                        </p>

                        <div className="flex items-center gap-[2.5rem] my-[1rem]">
                            <RadioBtn text={"Male"} value={"male"} icon={<ImMan />} name={"gender"} addGender={addGender} checked={gender} />
                            <RadioBtn text={"Female"} value={"female"} icon={<ImWoman />} name={"gender"} addGender={addGender} checked={gender} />
                        </div>

                        <button className="capitalize bg-color-primary hover:bg-color-hover-btn transition-all duration-300 px-[2rem] py-[.5rem] rounded-xl text-white 360:mt-[1rem] font-semibold" onClick={() => submitSave()}>
                            save
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddGender