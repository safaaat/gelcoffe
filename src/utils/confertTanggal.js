export const confertTanggal = (value) => {
    let dataDate = new Date(value);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let tanggal = dataDate.getDate();
    let bulan = months[dataDate.getMonth()];
    let tahun = dataDate.getFullYear();

    if (tanggal < 10) tanggal = `0${tanggal}`

    let fullData = `${tanggal}-${bulan}-${tahun}`

    return fullData
}