import React, { useEffect, useState } from "react";
import { IoClose } from "../../utils/icon"

const KoleksiPhoto = ({ loginAkunPelanggan, putPelangganById, klikBtn }) => {
    const [dataImg, setDataImg] = useState([])

    useEffect(() => {
        // LOOPING DATA IMAGE
        const loopDataImg = () => {
            const totalImg = 16;
            let img = [];
            for (let i = 1; i <= totalImg; i++) {
                img = [...img, { img: i }]
            }
            return img;
        }
        const data = loopDataImg()
        setDataImg(data);
    }, [])

    console.log(dataImg)

    const submitImg = (value) => {
        const loginAkun = loginAkunPelanggan[0];
        const profile_img = `${value}.png`;

        const putData = { ...loginAkun, profile_img }

        putPelangganById(loginAkun, putData);
    }

    return (
        <>
            <div className="relative">
                <div className="fixed w-full h-screen 2xl:w-[84.3rem] z-[35] top-0">
                    <div className="parent_img-personal">
                        <div className="text-[1.5rem] flex justify-end w-full"><IoClose className="cursor-pointer m-[.5rem] mr-[1rem] transition-all duration-300 hover:text-red-500" onClick={() => klikBtn(false, false)} /></div>

                        <ul className="ul_img">
                            {dataImg.map((data, index) => (
                                <li key={index} className="li_img group" onClick={() => submitImg(data.img)}>
                                    <span className="text-btn group-hover:opacity-100">pilih</span>
                                    <img src={process.env.PUBLIC_URL + `/assets/images/avatar/${data.img}.png`} alt={`img-${data.img}`} className="w-[13rem]" />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default KoleksiPhoto