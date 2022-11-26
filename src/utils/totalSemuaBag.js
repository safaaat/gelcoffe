// Function total semua jumlah product
const totalSemuaBag = (data) => {
    let hasil = 0
    data.forEach(element => {
        return hasil = hasil + element.jumlah
    });
    return hasil;
}

// Function total harga product
const totalHargaBag = (data) => {
    let hasil = 0;
    data.forEach(element => {
        let perkalian = element.harga * element.jumlah;
        return hasil += perkalian;
    })
    return hasil;
}

// Funtion Input Number
const inputNumber = (value) => {
    let hasil
    let input = Number(value)
    let arrayAngka = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    arrayAngka.forEach((e) => {
        if (e === input) {
            return hasil = value;
        }
    })
    return hasil
}

// Function Max Input
const tipeInput = (value, judul) => {
    if (judul === "Recipient's Name") return { nama: value }
    if (judul === "Kota") return { kota: value }
    if (judul === "Kecamatan") return { kecamatan: value }
    if (judul === "Kode Pos") return { kodePos: value }
    if (judul === "Complete Address") return { alamatLengkap: value }
    if (judul === "Catatan Kurir (opsional)") return { catatanKurir: value }
}

export {
    totalSemuaBag,
    totalHargaBag,
    inputNumber,
    tipeInput
}