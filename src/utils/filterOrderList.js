const filterOrderList = (value, status) => {
    let dataProduct = value.filter((data) => {
        return data.status === status;
    })

    if (status === "confirmasi") {
        let dataProduct = value.filter((data) => {
            return data.status === status || data.status === "wait";
        })

        return dataProduct;
    }

    return dataProduct;
}

export { filterOrderList }