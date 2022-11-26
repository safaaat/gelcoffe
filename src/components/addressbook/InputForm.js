import { React, useState } from "react";
import { inputNumber } from "../../utils/totalSemuaBag";
import { JudulInput } from "./index"

const InputForm = ({ data, updateDataAddress, maxJumlah, valueInput, inputLength }) => {
    const [active, setActive] = useState({ boolean: false, text: "" })

    let jumlahInput = inputLength + "/" + maxJumlah;
    // Function Validasi Input
    const validasiInput = (value) => {
        // Jika Catatan Kurir Validasi Warning Off
        if (data.code === 7) return setActive({ boolean: false, text: "" });

        if (value === "") return setActive({ boolean: true, text: "must be filled" });
        // Validasi For Name
        if (value.length >= 1 && value.length < 3 && data.code === 1) return setActive({ boolean: true, text: "the name is too short (minimum. 3 digits)." });
        // Validasi For Number Phone
        if (value.length >= 1 && value.length < 12 && data.code === 2) return setActive({ boolean: true, text: "Phone Number Too Short (minimum. 10 Digits)." });
        if (value.length >= 1 && value.length < 4 && data.code === 3) return setActive({ boolean: true, text: "city is too short (minimum. 4 digits)." });
        if (value.length >= 1 && value.length < 4 && data.code === 4) return setActive({ boolean: true, text: "Subdistrict is too short (minimum. 4 digits)." });
        if (value.length >= 1 && value.length < 5 && data.code === 5) return setActive({ boolean: true, text: "Postal Code is too short (minimum. 5 digits)." });
        if (value.length >= 1 && value.length < 15 && data.code === 6) return setActive({ boolean: true, text: "Complete Address is too short (minimum. 15 digits)." });
        return setActive({ boolean: false, text: "" });
    }

    // Function Cek Input Objek
    const objectType = (input, code) => {
        if (code === 1) return { nama: input }
        if (code === 2) return { nomorhp: input }
        if (code === 3) return { kota: input }
        if (code === 4) return { kecamatan: input }
        if (code === 5) return { kodePos: input }
        if (code === 6) return { alamatLengkap: input }
        if (code === 7) return { catatanKurir: input }
        if (code === 7) return { catatanKurir: input }
    }

    // Function Max Input
    const maxInputText = (value) => {
        // Menampung Panjang Input
        let valueLength = value.length;
        // Jika Input Mencapai Max Stop.
        if (valueLength >= maxJumlah) return value.slice(0, maxJumlah);
        // Jika Tidak Lanjutkan
        return value
    }
    // Function Check, Tidak Boleh Input Huruf.
    const hurufToNumber = (value) => {
        if (inputNumber(value) === undefined) return "";
        return value
    }
    const numberOrKodePos = (value, code) => {
        let input = value.match(/\d{1,4}/g);
        // Code Pos, Tidak Di Beri Spasi
        if (code === 5) return input = input.join("");
        // Phone, Di Beri Spasi
        if (code === 2) return input = input.join(" ");
    }

    // Function Format Number
    const maxInputNumber = (value, code) => {
        // Jika Input Tidak Ada Return Value
        if (!value) return value;
        // Ketika Input 1 kata return Function Cek HurufToNumber
        if (value.length === 1) return hurufToNumber(value);
        // Jika Phone Setelah 4 Digit Di Beri Spasi, Jika Kode Pos Tidak
        let valueInput = numberOrKodePos(value, code);
        // mengembalikan nilai Input
        return valueInput.slice(0, maxJumlah);
    }
    // Function Membedakan Input Biasa Dengan Input Number
    const kondisiMax = (value, code) => {
        // Variable Menampung value
        let input = value;
        // Jika Input Phone And Kode Pos 
        if (code === 2 || code === 5) return input = maxInputNumber(input, code);
        // Jika Input Bukan Phone And Kode Pos
        return input = maxInputText(input);
    }
    // Function Input
    const changeOnInput = (value) => {
        // Validasi Input
        validasiInput(value);

        // Function Conditions Check Tipe Input
        let input = kondisiMax(value, data.code);
        // Nampung Value Objek
        let objekInput = objectType(input, data.code);

        // kirim Data Objek Ke Function Update Data Address
        updateDataAddress(objekInput);
    }

    return (
        <>
            <div className="relative group">
                {/* Judul */}
                <JudulInput active={active.boolean} judul={data.judul} inputLength={inputLength} />
                {/* Input */}
                {data.code === 6
                    ? <textarea rows="10" className={!active.boolean ? "input-form h-[10rem]" : "input-form_warning h-[10rem]"} value={valueInput} onChange={(input) => changeOnInput(input.target.value)} />

                    : <input className={!active.boolean ? "input-form" : "input-form_warning"} value={valueInput} onChange={(input) => changeOnInput(input.target.value)} />
                }

                {/* Validasi */}
                <div className="absolute flex justify-between w-full text-xs mt-1">
                    {/* Note Untuk Catatan Kurir */}
                    {data.code === 7 ? <p className="text-xs text-color-gray font-normal">Warna rumah, patokan, pesan khusus, dll.</p> : ""}
                    {/* Note Untuk Warning Input */}
                    {!active ? "" : <p className="capitalize text-red-500">{active.text}</p>}
                    {/* Jumlah Input */}
                    <span>{jumlahInput}</span>
                </div>
            </div>
        </>
    )
}

export default InputForm