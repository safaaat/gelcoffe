import { React } from "react";
import { Api_Url } from "../../utils/constants";
import axios from "axios";
import { useState } from "react";
import LoadingAddData from "../LoadingAddData";

function Login({ submitForm, checkInputUsername, checkInputPassword, clearValidUser, clearValidPass, loginAkun, dataValueLogin, updateData }) {
    const [loading, setLoading] = useState(false);

    const handleOnLogin = (event) => {
        event.preventDefault()

        if (dataValueLogin.username === "") {
            clearValidUser(true, "userName tidak boleh kosong!")
        } else {
            clearValidUser(false, "")
        }
        if (dataValueLogin.password === "") {
            clearValidPass(true, "Password Tidak Boleh Kosong!")
        } else {
            clearValidPass(false, "")
        }
        if (dataValueLogin.username !== "" && dataValueLogin.password !== "") {
            getLoginAkun(dataValueLogin)
        }
    }

    // Get Login Akun
    const getLoginAkun = async (data) => {
        setLoading(true)
        // Check Get Username
        await axios({
            method: "get",
            url: `${Api_Url}pelanggan?user_name=${data.username}`
        }).then((res) => {
            // cek apakah username ada atau tidak, Jika tidak get Check Email, jika ada kirim respons ke loginakun
            if (res.data.length === 0) {
                // check get Email
                loginAkunGetEmail(data)
            }
            else {
                let dataUser = res.data[0]

                if (dataUser.password === data.password) {
                    // jika password sama dengan yang di input maka kirimkan data ke login akun
                    loginAkun(res.data)
                    // Function untuk membuat nilai input menjadi kosong telah login sukses
                    updateData({ username: "", password: "" })
                    // Funtion untuk close form login
                    submitForm(false, "")
                    // Loading
                    setLoading(false);
                } else {
                    clearValidPass(true, "Password Yang Anda Masukan Salah Ni Kaka!")
                    setLoading(false);
                }
                clearValidUser(false, "")
            }
        }).catch(err => {
            console.log(err);
            // Loading
            setLoading(false);
        })
    }
    const loginAkunGetEmail = (data) => {
        setLoading(true)
        axios({
            method: "get",
            url: `${Api_Url}pelanggan?email=${data.username}`
        }).then((res) => {
            if (res.data.length === 0) {
                clearValidUser(true, "Username or email tidak terdaftar!")
                clearValidPass(false, "")
                // Loading
                setLoading(false);
            } else {
                // valiable menampung data user
                let dataUser = res.data[0]

                if (dataUser.password === data.password) {
                    // jika password sama dengan yang di input maka kirimkan data ke login akun
                    loginAkun(res.data)
                    // Function untuk membuat nilai input menjadi kosong telah login sukses
                    updateData({ username: "", password: "" })
                    // Funtion untuk close form login
                    submitForm(false, "");
                    // Loading
                    setLoading(false)
                } else {
                    // function jika password yang di input tidak sesuai
                    clearValidPass(true, "Password Yang Anda Masukan Salah Ni Kaka!")
                }
                // fucntion jika username kosong
                clearValidUser(false, "userName tidak boleh kosong!")
            }
        }).catch(err => {
            console.log(err);
            // Loading
            setLoading(false);
        })
    }

    return (
        <>
            <div className={!loading ? "hidden" : "inline-block"}>
                <LoadingAddData />
            </div>

            <form onSubmit={handleOnLogin}>
                <h3 className="text-color-black text-2xl capitalize text-center font-semibold">My Account</h3>
                <div className="grid gap-[1.5rem] 360:gap-[2rem] mt-[2rem] 360:mt-[3rem]">
                    <div className="prent_input">
                        <p className={!checkInputUsername.value ? "hidden" : "correction_form"}>{checkInputUsername.text}</p>
                        <input type="text" className={!checkInputUsername.value ? "input" : "warning-input"} placeholder="Input Your Username Or Email" name="userName" value={dataValueLogin.username} onChange={(input) => updateData({ username: input.target.value })} />
                        <p className="text_input">Username or Email</p>
                    </div>
                    <div className="prent_input">
                        <p className={!checkInputPassword.value ? "hidden" : "correction_form"}>{checkInputPassword.text}</p>
                        <input type="password" className={!checkInputPassword.value ? "input" : "warning-input"} placeholder="Input Your Password" name="password" value={dataValueLogin.password} onChange={(input) => updateData({ password: input.target.value })} />
                        <p className="text_input">Password</p>
                    </div>
                </div>

                <div className="w-full px-6 mt-[2rem] 360:mt-[3rem] mb-[1.5rem]">
                    <button className="w-full bg-gray-400 transition-all duration-500 hover:bg-color-hover capitalize text-[1.5rem] text-white py-2 rounded-xl" onSubmit={handleOnLogin}>login</button>
                </div>
            </form >

            <div className="flex mx-6 text-sm text-gray-500 mb-2 gap-1 items-center">
                <p>Don't have an account?</p>
                <button className="text-base text-color-primary hover:text-color-hover transition-all duration-300" onClick={() => submitForm(true, "register")}>Register</button>
            </div>
        </>
    )
}

export default Login