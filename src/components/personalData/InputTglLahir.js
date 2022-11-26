import { data } from "autoprefixer";
import React from "react";
import { useState } from "react";
import { IoIosArrowDown } from "../../utils/icon"

const InputTglLahir = ({ valueLi, valueBtn, cssValue, updateData }) => {
    const [btn, setBtn] = useState(valueBtn);
    const [btnClick, setBtnClick] = useState(false);
    const [indexClick, setIndexClick] = useState(null);

    const mapAngka = (data) => {
        return data.map((data, index) => {
            return (
                <li
                    key={index}
                    value={data}
                    className={indexClick === index ? "li_data-click" : "li_data"}
                    onClick={() => submitValue(data, index)}
                >
                    {data}
                </li >
            )
        })
    }

    const submitAktifBtn = (e) => {
        if (btnClick === true) return setBtnClick(false);
        return setBtnClick(e);
    }

    const submitValue = (e, i) => {
        setBtnClick(false);
        setIndexClick(i)
        setBtn(e);
        valueTaggalLahir(e);
    }

    const valueTaggalLahir = (e) => {
        if (valueBtn === "Tanggal") {
            data = { tanggal: e }
            updateData(data);
        }
        if (valueBtn === "Bulan") {
            data = { bulan: e }
            updateData(data);
        }
        if (valueBtn === "Tahun") {
            data = { tahun: e }
            updateData(data);
        }
    }

    return (
        <>
            <div className="inline-block">
                <div className="grid relative">
                    {/* Button */}
                    <button className={!btnClick ? `btn_${cssValue}` : `btn_${cssValue}-aktif`} onClick={() => submitAktifBtn(true)}>
                        {btn}
                        <span className={!btnClick ? "icon_btn-tgllahir" : "icon_btn-tgllahir-aktif"}><IoIosArrowDown /></span>
                    </button>

                    {/* Data List */}
                    <div className={!btnClick ? `list_${cssValue}` : `list_${cssValue}-aktif`}>
                        <ul className="overflow-auto">
                            {mapAngka(valueLi)}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InputTglLahir