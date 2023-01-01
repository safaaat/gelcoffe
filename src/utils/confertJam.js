export const confertJam = (value) => {
    let date = new Date(value)

    let jam = date.getHours();
    let menit = date.getMinutes();

    if (jam < 10) jam = `0${jam}`;
    if (menit < 10) menit = `0${menit}`;

    let hour = `${jam}:${menit}`;

    return hour
}