import { React, useState, useCallback, useEffect } from "react";
import { DataPayment } from "./index";

const DisplayStatusPayment = ({ idOrder, paymentConfirmasi, updateIdConfirmasi }) => {
    const [dataOrder, setDataOrder] = useState([]);


    const filterDataOrder = useCallback((id, dataPayment) => {
        let newData = dataPayment.filter((data) => {
            return data.id === parseInt(id);
        })
        setDataOrder(newData);
    }, [])

    useEffect(() => {
        filterDataOrder(idOrder, paymentConfirmasi)
    }, [filterDataOrder, idOrder, paymentConfirmasi])

    return (
        <>
            {dataOrder.length === 0
                ? <p>Loading...</p>
                : <DataPayment dataOrder={dataOrder} updateIdConfirmasi={updateIdConfirmasi} />
            }
        </>
    )
}

export default DisplayStatusPayment