// Function looping tanggal
const lopTanggal = () => {
    let hasil = [];

    for (let i = 1; i <= 31; i++) {
        if (i <= 9) {
            hasil = [...hasil, "0" + i];
        } else {
            hasil = [...hasil, i];
        }
    }
    return hasil;
}

// Function Data Bulan
const dataBulan = () => {
    let hasil = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return hasil;
}

// Function Data Tahun.
const dataTahun = () => {
    let data = [];
    let today = new Date();
    let tahun = today.getFullYear();
    tahun -= 14;

    for (let i = 1942; i <= tahun; i++) {
        data = [...data, i]
    }

    return data;
}

export { lopTanggal, dataBulan, dataTahun }