import axios from "axios";
import React, { useState } from "react";
import { FaUserAlt } from "../utils/icon";
import { FaTglLahir, LoadingAddData } from "../components/Index";
import AlertPersonData from "../components/AlertPersonData";
import { Api_Url } from "../utils/constants";
import { AddGender, InputHandphone, KoleksiPhoto } from "../components/personalData";

const CheckValue = ({ value, btn, klikBtn, }) => {
    if (value === undefined) return <button className="btn_personal-data" onClick={() => klikBtn(btn, true)}>{btn}</button>

    if (value && btn === "Add Phone Number") return <div className="grid gap-1 640:flex 640:gap-[1.5rem]"><p>{value}</p><button className="btn_edit-phone" onClick={() => klikBtn(btn, true)}>Edit</button></div>

    return <p>{value}</p>
}

// IMG PROFILE
const ImageProfile = ({ loginAkunPelanggan }) => {
    const dataUser = loginAkunPelanggan[0];

    if (dataUser.profile_img === undefined) return <div className="text-[15rem] 640:text-[16rem]"><FaUserAlt className="mx-auto" /></div>
    return <img src={process.env.PUBLIC_URL + `/assets/images/avatar/${dataUser.profile_img}`} alt="img-profile" className="md:w-[16rem] mx-auto" />
}

function PersonalData({ loginAkunPelanggan, onOffScrollBody, getPelanggan, loginAkun }) {
    const [activeBtn, setActiveBtn] = useState(false);
    const [backgroundHover, setBackgroundHover] = useState(false);
    const [alertValTglLahir, setAlertValTglLahir] = useState(false);
    const [loading, setLoading] = useState(false);

    //Function Aktivasi From 
    const klikBtn = (event, boolean) => {
        setActiveBtn(event)
        setBackgroundHover(boolean)

        // Function On Off BackGround Scroll Body (App.js)
        onOffScrollBody(boolean)
    }

    const activeAlert = (value) => {
        setAlertValTglLahir(value);

        setTimeout(() => {
            setAlertValTglLahir(false);
        }, 7000);
    }

    const faLoading = (value) => {
        setLoading(value)
    }

    const putPelangganById = async (akunLogin, dataPut) => {
        // Menghilangkan Alert
        activeAlert(false)
        // Active Loading
        faLoading(true)
        // Put Tanggal Lahir
        await axios.put(`${Api_Url}pelanggan/${akunLogin.id}`, dataPut)
            .then((res) => {
                // Get Daftar Pelanggan
                getPelanggan()
                // Off Loading
                faLoading(false);
                // Close From
                klikBtn(false);
                // Update Data
                loginAkun([res.data]);
            })
            .catch(error => {
                console.log(error);
                // Off Loading
                faLoading(false);
            })
    }

    return (
        <div className="windows-out">
            <div className="dimensi-border">
                <div className="grid gap-[2rem] md:flex">
                    {/* Avatar User */}
                    <div className="grid gap-[1rem]">
                        <div className="shadow-sm shadow-black/50 p-[1rem] grid">
                            {/* Image */}
                            <ImageProfile loginAkunPelanggan={loginAkunPelanggan} />

                            {/* Button */}
                            <button className="border-[1px] border-black/20 capitalize text-[1rem] py-[.5rem] rounded-md mt-[1rem] text-black font-semibold cursor-pointer w-full transition-all duration-300 hover:bg-black/20 hover:text-white hover:border-black/0" onClick={() => klikBtn("pilih photo", true)}>select photo</button>
                        </div>
                    </div>

                    {/* Text Personal Data */}
                    <div className="my-[.1rem] 360:my-[.3rem] 640:my-[1rem]">
                        <div>
                            <ul>
                                {loginAkunPelanggan.map((data) => (
                                    <li key={data.id} className="capitalize grid gap-[2rem]">
                                        <div className="grid gap-[1rem]">
                                            <h3 className="font-semibold">edit personal data</h3>
                                            <h3 className="nama_user">
                                                name <span>{data.user_name}</span>
                                            </h3>
                                            <h4 className="tanggal_lahir">
                                                date of birth
                                                <span>
                                                    <CheckValue
                                                        value={
                                                            data.tanggal_lahir
                                                        }
                                                        btn={"Add Date Of Birth"}
                                                        klikBtn={klikBtn}
                                                    />
                                                </span>
                                            </h4>
                                            <h4 className="flex gap-[4.5rem]">
                                                Gender
                                                <span>
                                                    <CheckValue value={data.jenis_kelamin} btn={"Add Gender"} klikBtn={klikBtn} />
                                                </span>
                                            </h4>
                                        </div>

                                        <div className="grid gap-[1rem]">
                                            <h3 className="font-semibold">edit contact</h3>
                                            <h4 className="flex gap-[5.4rem]">
                                                Email
                                                <span className="lowercase">

                                                    <CheckValue value={data.email} btn={""} />
                                                </span>
                                            </h4>
                                            <h4 className="flex gap-[1rem]">
                                                phone number
                                                <span>
                                                    <CheckValue value={data.nomor_telp} btn={"Add Phone Number"} klikBtn={klikBtn} />
                                                </span>
                                            </h4>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            {/* Loading Pada Saat add data */}
            {!loading ? "" : <LoadingAddData />}

            {/* Alert Notifikasi, ketika  */}
            <AlertPersonData alertValTglLahir={alertValTglLahir} />

            {/* Form Tanggal Lahir */}
            {activeBtn === "Add Date Of Birth" ? <FaTglLahir klikBtn={klikBtn} activeAlert={activeAlert} loginAkunPelanggan={loginAkunPelanggan} getPelanggan={getPelanggan} faLoading={faLoading} loginAkun={loginAkun} putPelangganById={putPelangganById} /> : ""}
            {/* From Add Gender */}
            {activeBtn === "Add Gender" ? <AddGender klikBtn={klikBtn} loginAkunPelanggan={loginAkunPelanggan} putPelangganById={putPelangganById} /> : ""}
            {/* From Add Handphone */}
            {activeBtn === "Add Phone Number" ? <InputHandphone klikBtn={klikBtn} putPelangganById={putPelangganById} loginAkunPelanggan={loginAkunPelanggan} /> : ""}
            {/* From Edit Handphone */}
            {activeBtn === "Add Phone Number" ? <InputHandphone klikBtn={klikBtn} putPelangganById={putPelangganById} loginAkunPelanggan={loginAkunPelanggan} /> : ""}
            {/* Select Photo */}
            {activeBtn === "pilih photo" ? <KoleksiPhoto loginAkunPelanggan={loginAkunPelanggan} putPelangganById={putPelangganById} klikBtn={klikBtn} /> : ""}





            {/* Background bag */}
            <div className={!backgroundHover ? "hidden" : "bg-black/80 w-full h-screen fixed top-0 z-[30]"}></div>
        </div>
    )
}

export default PersonalData