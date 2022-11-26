import { React, useState } from "react";
import axios from "axios";
import { Api_Url } from "../../utils/constants";
import LoadingAddData from "../LoadingAddData";

function Register({ submitForm, postPelanggan, checkInputUsername, checkInputEmail, checkInputPassword, clearValidUser, clearValidEmail, clearValidPass, updateData, dataValueRegister }) {
    const [loading, setLoading] = useState(false);

    // Function Handle From Register
    const handleOnRegister = (event) => {
        event.preventDefault();

        let lengPassword = dataValueRegister.password.length

        // Check Input Cannot Be Empty
        if (dataValueRegister.username === "") {
            clearValidUser(true, "userName tidak boleh kosong!")
        } else {
            clearValidUser(false, "")
        }
        if (dataValueRegister.email === "") {
            clearValidEmail(true, "email tidak boleh kosong!")
        } else {
            clearValidEmail(false, "")
        }
        if (dataValueRegister.password === "") {
            clearValidPass(true, "password tidak boleh kosong!")
        } else if (lengPassword < 6 || lengPassword > 12) {
            clearValidPass(true, "Password minimal 6, max 12 karakter!")
        }
        else {
            clearValidPass(false, "")
        }

        // Chech All Input, Is It Already Filled?
        if (dataValueRegister.username !== "" && dataValueRegister.email !== "" && dataValueRegister.password !== "" && lengPassword > 5 && lengPassword < 13) {

            // Empty To Input Form
            event.target.userName.value = "";
            event.target.email.value = "";
            event.target.password.value = "";

            // Function Validasi To Check The Username And Email Have Been Used Or Not
            validasiUsernameEmail(dataValueRegister);
        }
    }

    // Check, Are UserName And Email Equal to True, If true Send to postRegister
    const validasiUsernameEmail = (data) => {
        // Call Function Check UserName
        cekUserName(data);
        // Call Function Check Email
        cekEmail(data);
    }

    // Function Check UserName
    const cekUserName = async (data) => {
        // State Aktive Loading
        setLoading(true);

        // Get Axios Check If The Username Already Exists
        await axios({
            method: "get",
            url: `${Api_Url}pelanggan?user_name=${data.username}`,
        }).then(res => {
            // if username data exists, send false
            if (res.data.length > 0) {
                clearValidUser(true, "userName sudah digunakan!")
                setLoading(false);
            }
            // if username data does not exist, send true 
            else {
                clearValidUser(false, "")
                // Get Axios Check If The Username Already Exists
                axios({
                    method: "get",
                    url: `${Api_Url}pelanggan?email=${data.email}`,
                }).then(res => {
                    // Check Email Sudah Terdaftar Belom
                    if (res.data.length > 0) {
                        // Jika Sudah, Exsekusi Ini
                        clearValidEmail(true, "email yang tudah terdaftar");
                        setLoading(false);
                    } else {
                        // Jika Belom, Exsekusi Ini
                        clearValidEmail(false, "");
                        postPelanggan(dataValueRegister);
                        updateData({ username: "", email: "", password: "", });
                        setLoading(false);
                    };
                })
            }
        })
    }
    // Function Check Email
    const cekEmail = async (data) => {
        await axios({
            method: "get",
            url: `${Api_Url}pelanggan?email=${data.email}`,
        }).then(res => {
            if (res.data.length > 0) {
                clearValidEmail(true, "email yang tudah terdaftar")
            } else {
                clearValidEmail(false, "")
            }
        })
    }

    return (
        <>
            {/* Loading */}
            <div className={!loading ? "hidden" : "inline-block"}>
                <LoadingAddData />
            </div>

            {/* FORM */}
            <form onSubmit={handleOnRegister}>
                <h3 className="text-color-black text-2xl capitalize text-center font-semibold">create account</h3>
                <div className="grid gap-[.5rem] 360:gap-[2rem] mt-[1.5rem] 360:mt-[3rem]">
                    <div className="prent_input">
                        <p className={!checkInputUsername.value ? "hidden" : "correction_form"}>{checkInputUsername.text}</p>
                        <input type="text" className={checkInputUsername.value === true ? "warning-input" : "input"} placeholder="Input Your Username" name="userName" value={dataValueRegister.username} onChange={(input) => updateData({ username: input.target.value })} />
                        <p className="text_input">Username</p>
                    </div>
                    <div className="prent_input">
                        <p className={!checkInputEmail.value ? "hidden" : "correction_form"}>{checkInputEmail.text}</p>
                        <input type="email" className={checkInputEmail.value === true ? "warning-input" : "input"} placeholder="Input Your Email" name="email" value={dataValueRegister.email} onChange={(input) => updateData({ email: input.target.value })} />
                        <p className="text_input">Email</p>
                    </div>
                    <div className="prent_input">
                        <p className={!checkInputPassword.value ? "hidden" : "correction_form"}>{checkInputPassword.text}</p>
                        <input type="password" className={checkInputPassword.value === true ? "warning-input" : "input"} placeholder="Input Your Password" name="password" value={dataValueRegister.password} onChange={(input) => updateData({ password: input.target.value })} />
                        <p className="text_input">Password</p>
                    </div>
                </div>

                <div className="w-full px-6 mt-[2rem] 360:mt-[3rem] mb-[1.5rem]">
                    <button className="w-full bg-gray-400 transition-all duration-500 hover:bg-color-hover capitalize text-[1.5rem] text-white py-2 rounded-xl" onSubmit={handleOnRegister}>daftar</button>
                </div>
            </form >

            <div className="flex mx-6 text-sm text-gray-500 mb-2 gap-1 items-center">
                <p className="capitalize">already register?</p>
                <button className="text-base text-color-primary hover:text-color-hover transition-all duration-300" onClick={() => submitForm(true, "login")}>login</button>
            </div>
        </>
    )
}

export default Register