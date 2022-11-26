import React from "react";
import { FaUserAlt } from "../utils/icon";

const ImgUser = ({ data }) => {
    console.log(data);
    if (data === undefined) return <div className="text-[5rem] text-gray-500"><FaUserAlt className="mx-auto" /></div>
    return
}

const UserMobile = ({ loginAkunPelanggan }) => {
    return (
        <>
            <div className="relative w-full">
                <div className="fixed top-0 left-0 z-[100] bg-gray-100 w-full">
                    <div className="w-[90%] mx-auto">
                        <ul>
                            {loginAkunPelanggan.map((data) => (
                                <li key={data.id}>
                                    <div className="flex items-center">
                                        <ImgUser data={data.img} />
                                        <div>
                                            <h3>{data.user_name}</h3>
                                            <h4>{data.telepon}</h4>
                                            <h5>{data.email}</h5>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserMobile