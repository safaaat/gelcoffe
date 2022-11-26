export const changeToRp = (number) => {
    let rupiah = number.toString().split("").reverse().join("");
    rupiah = rupiah.match(/\d{1,3}/g);
    rupiah = rupiah.join(".").split("").reverse().join("");

    return rupiah;
}

