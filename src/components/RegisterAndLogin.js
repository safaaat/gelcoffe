import { React, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Register, Login } from "./form/index";
import { AlertRegister } from "./Index";
import { LoadingAddData } from "../components/Index";

function RegisterAndLogin({ showFromRegister, showRegister, tipeForm, confimasiRegister, setAlertRegister, postPelanggan, loginAkun, loading }) {

    const [checkInputUsername, setCheckInputUsername] = useState({ value: false, text: "", });
    const [checkInputEmail, setCheckInputEmail] = useState({ value: false, text: "", });
    const [checkInputPassword, setCheckInputPassword] = useState({ value: false, text: "", });

    // state data form input login
    const [dataValueLogin, setDataValueLogin] = useState({ username: "", password: "", });
    // state data form input register
    const [dataValueRegister, setDataValueRegister] = useState({ username: "", email: "", password: "", });


    // Clear Validasi Form Login UserName
    const clearValidUser = (value, text) => {
        setCheckInputUsername({
            value: value,
            text: text,
        })
    }
    const clearValidEmail = (value, text) => {
        setCheckInputEmail({
            value: value,
            text: text,
        })
    }
    // Clear Validasi Password
    const clearValidPass = (value, text) => {
        setCheckInputPassword({
            value: value,
            text: text,
        })
    }

    const submitForm = (value, tipeForm) => {
        showFromRegister(value, tipeForm)

        // Call Functon Clear Validasi Login
        clearValidUser(false)
        // Call Functon Clear Validasi Email
        clearValidEmail(false)
        // Call Functon Clear Validasi Password
        clearValidPass(false)

        // clear Input Value Form Login
        setDataValueLogin({ username: "", password: "", })
        // clear Input Value Form Register
        setDataValueRegister({ username: "", email: "", password: "", })
    }

    const updateFormloginData = (newData) => {
        setDataValueLogin(prev => {
            return { ...prev, ...newData }
        })
    }
    // Function update State Form Register
    const updateFormRegisterData = (newData) => {
        setDataValueRegister(prev => {
            return { ...prev, ...newData }
        })
    }

    return (
        <>
            <div className={!loading ? "hidden" : "inline-block"}>
                <LoadingAddData />
            </div>

            <div className={!showRegister ? "hidden_registration" : "show_registration"}>
                <div className="w-[30rem] bg-white">
                    <div className="flex justify-end py-2 px-2">
                        <button className="text-white bg-black bg py-1 px-[4px] rounded-[4px] hover:bg-color-hover transition-all duration-500 hover:text-black" onClick={() => submitForm(false)}>
                            <AiOutlineClose />
                        </button>
                    </div>

                    {/* Confirmasi Alert Register */}
                    {confimasiRegister.length === 0
                        // If Data Is Empty, Display This.
                        ? ""
                        // If Data Is Not Empty, Display This.
                        : <AlertRegister confimasiRegister={confimasiRegister} setAlertRegister={setAlertRegister} />
                    }

                    {/* Jika Tipe sama dengan register maka form register akan aktif */}
                    {tipeForm === "register"
                        ? <Register showFromRegister={showFromRegister} postPelanggan={postPelanggan} checkInputUsername={checkInputUsername} checkInputEmail={checkInputEmail} checkInputPassword={checkInputPassword} clearValidUser={clearValidUser} clearValidEmail={clearValidEmail} clearValidPass={clearValidPass} submitForm={submitForm} dataValueRegister={dataValueRegister} updateData={updateFormRegisterData} />
                        : <Login showFromRegister={showFromRegister} showRegister={showRegister} checkInputUsername={checkInputUsername} checkInputPassword={checkInputPassword} clearValidUser={clearValidUser} clearValidPass={clearValidPass} loginAkun={loginAkun} submitForm={submitForm} dataValueLogin={dataValueLogin} updateData={updateFormloginData} />
                    }
                </div>
            </div >
        </>
    )
}

export default RegisterAndLogin