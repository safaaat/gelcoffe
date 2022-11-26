import { useEffect } from "react";
import { React, useState } from "react";
import { inputNumber, tipeInput } from "../../utils/totalSemuaBag"

const CekInput = ({ valueState, updateDataAddress, judul, active, maxJumlah }) => {
    // Function Max Text Input
    const validMaxJumlah = (input) => {
        // Check Tipe Input, apakah nama, kota, dll
        let cekValue = tipeInput(input, judul)
        // Variable Panjang Text
        let valueInputLength = input.length;
        // Jika Jumlah Input Sama Dengan Max Jumlah, berhenti
        if (valueInputLength >= maxJumlah + 1) return
        // Jika Text Input Tidak Max, kirim Nilai Input.
        return updateDataAddress(cekValue)
    }

    // Function Format Number Phone
    const formatNumber = (input) => {
        // Function Objek
        const objekInput = (value) => {
            if (judul === "Phone Number") return { nomorhp: value }
            if (judul === "Kode Pos") return { kodePos: value }
        }
        // Function Spasi
        const spaceInput = (value) => {
            // Ketika Nilai Leng input 4
            let inputPhone = value.match(/\d{1,4}/g);
            // Nambahkan Spasi
            if (judul === "Phone Number") return inputPhone = inputPhone.join(" ");
            if (judul === "Kode Pos") return inputPhone = inputPhone.join("");
        }

        // Jika Input kosong
        if (!input) return updateDataAddress(objekInput(input));
        // Jika Input 1 kata
        if (input.length === 1) {
            // Nampung Nilai Cek Input Number
            let value = inputNumber(input)
            // Jika Yang Di Input Bukan Number, Stop Input
            if (value === undefined) return updateDataAddress(objekInput(""));
            // Jika Yang Di Input  Number, Lesgo Input
            if (value !== undefined) return updateDataAddress(objekInput(input));
        }
        // Menampung Value Function SpaceInput
        let valueInput = spaceInput(input)
        // Jumlah Text Input Phone
        let valueInputLength = valueInput.length;
        // Untuk Number
        if (judul === "Phone Number") {
            // Jika jumlah Input Phone Mencapai Max, Berhenti Input
            if (valueInputLength >= 12) {
                return updateDataAddress(objekInput(`${valueInput.slice(0, maxJumlah)}`))
            }
        }
        // Untuk Kode Pos
        if (judul === "Kode Pos") {
            // Jika jumlah Input Kode Pos Mencapai Max, Berhenti Input
            if (valueInputLength >= 5) {
                return updateDataAddress(objekInput(`${valueInput.slice(0, maxJumlah)}`))
            }
        }
        // Jika jumlah Input Phone TIDAK Mencapai Max, Tetep Input
        return updateDataAddress(objekInput(valueInput));
    }

    // Pengkondisian Input
    if (judul === "Recipient's Name") return <input type="text" className={!active.value ? "input ring-2 ring-gray-400/50 text-base font-normal text-black" : "warning-input text-base font-normal"} value={valueState} onChange={(input) => validMaxJumlah(input.target.value)} />
    if (judul === "Phone Number") return <input className={!active.value ? "input ring-2 ring-gray-400/50 text-base font-normal text-black" : "warning-input text-base font-normal"} value={valueState} onChange={(input) => formatNumber(input.target.value)} />
    if (judul === "Kota") return <input type="text" className={!active.value ? "input ring-2 ring-gray-400/50 text-base font-normal text-black" : "warning-input text-base font-normal"} value={valueState} onChange={(input) => validMaxJumlah(input.target.value)} />
    if (judul === "Kecamatan") return <input type="text" className={!active.value ? "input ring-2 ring-gray-400/50 text-base font-normal text-black" : "warning-input text-base font-normal"} value={valueState} onChange={(input) => validMaxJumlah(input.target.value)} />
    if (judul === "Kode Pos") return <input className={!active.value ? "input ring-2 ring-gray-400/50 text-base font-normal text-black" : "warning-input text-base font-normal"} value={valueState} onChange={(input) => formatNumber(input.target.value)} />
    if (judul === "Complete Address") return <textarea rows="5" className={!active.value ? "input ring-2 ring-gray-400/50 text-base font-normal text-black resize-none" : "warning-input text-base font-normal resize-none"} value={valueState} onChange={(input) => validMaxJumlah(input.target.value)} />
    if (judul === "Catatan Kurir (opsional)") return <input type="text" className={!active.value ? "input ring-2 ring-gray-400/50 text-base font-normal text-black" : "warning-input text-base font-normal"} value={valueState} onChange={(input) => validMaxJumlah(input.target.value)} />
}

// Function Jumlah Input
const CekJumlah = ({ judul, jumlah, maxJumlah }) => {
    let value = `${jumlah}/${maxJumlah}`
    // Pengkondisian Input
    if (judul === "Recipient's Name") return <span className="text-xs font-normal text-gray-500 mt-1">{value}</span>
    if (judul === "Kota") return <p className="text-xs font-normal text-gray-500 mt-1">{value}</p>
    if (judul === "Kecamatan") return <p className="text-xs font-normal text-gray-500 mt-1">{value}</p>
    if (judul === "Kode Pos") return <p className="text-xs font-normal text-gray-500 mt-1">{value}</p>
    if (judul === "Complete Address") return <p className="text-xs font-normal text-gray-500 mt-1">{value}</p>
    if (judul === "Catatan Kurir (opsional)") return <p className="text-xs font-normal text-gray-500 mt-1">{value}</p>
}


const Input = ({ judul, valueState, updateDataAddress, maxJumlah }) => {
    // State Active Validasi Input
    const [active, setActive] = useState({ value: false, jumlah: valueState.length, text: "" });

    useEffect(() => {
        // Function Check Validasi Input
        const updateValidasi = () => {
            // JIka Input Kosong, Validasi Aktive
            if (valueState === "" && judul !== "Catatan Kurir (opsional)") return setActive({ value: true, jumlah: valueState.length, text: "Must Be Filled" });
            // Pengkondisian Untuk Number Phone
            if (judul === "Phone Number") {
                if (valueState.length >= 1 && valueState.length < 12) return setActive({ value: true, jumlah: valueState.length, text: "Minim 10 Number" });
            }
            // Pengkondisian Untuk Number Kode Pos
            if (judul === "Kode Pos") {
                if (valueState.length >= 1 && valueState.length < 5) return setActive({ value: true, jumlah: valueState.length, text: "Minim 5" });
            }
            // Jika Input Tidak Kosong, Validasi Tidak Aktif
            return setActive({ value: false, jumlah: valueState.length, text: "" });
        }
        // Call Function
        updateValidasi();
    }, [valueState, judul])

    return (
        <>
            <div className="relative">
                {/* Judul */}
                <h4 className="text-base mb-[.5rem]">{judul}</h4>
                {/* Input */}
                <CekInput valueState={valueState} updateDataAddress={updateDataAddress} judul={judul} active={active} maxJumlah={maxJumlah} />
                {/* Contect Validasi */}
                <div className="absolute w-full">
                    <div className="flex justify-between">
                        {/* Text Kurir */}
                        {judul === "Catatan Kurir (opsional)" ? <p className="text-xs text-color-gray font-normal">Warna rumah, patokan, pesan khusus, dll.</p> : ""}
                        {/* Validasi Warning Text */}
                        {!active.value ? <span></span> : <p className="text-xs text-red-500 font-normal mt-1">{active.text}</p>}
                        {/* Jumlah */}
                        <CekJumlah judul={judul} jumlah={active.jumlah} maxJumlah={maxJumlah} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Input