import { useCallback, useEffect } from "react";

const PaymentDuration = ({ putUpdatePaymentConfirmasi, paymentConfirmasi, changeStatusPayment, idConfirmasi, waitingConfirmation }) => {
    const updatePaymentDuration = useCallback((newData) => {
        putUpdatePaymentConfirmasi(newData);
    }, [putUpdatePaymentConfirmasi])

    const penguranganPaymentDuration = useCallback((dataPayment) => {
        let data = dataPayment;
        let dataMenit = data.durasiPembayaran.menit;
        let dataDetik = data.durasiPembayaran.detik;
        if (dataPayment.id === idConfirmasi) return waitingConfirmation(dataPayment, { status: "wait" });

        if (dataDetik !== 0) dataDetik -= 1;
        if (dataDetik === 0) {
            if (dataMenit <= 0 && dataDetik <= 0) return changeStatusPayment(dataPayment, { status: "cansel" });
            if (dataMenit !== 0) dataMenit -= 1;
            dataDetik = 59;
        }
        const newDurasiPembayaran = { durasiPembayaran: { menit: dataMenit, detik: dataDetik } }
        data = { ...data, ...newDurasiPembayaran }

        updatePaymentDuration(data);
    }, [updatePaymentDuration, changeStatusPayment, idConfirmasi, waitingConfirmation])

    const checkTotalPayment = useCallback((dataPayment) => {
        if (dataPayment.length >= 1) {
            dataPayment.forEach((data) => {
                if (data.status === "confirmasi") return penguranganPaymentDuration(data);
            })
        } else {
            if (dataPayment.status === "confirmasi") return penguranganPaymentDuration(dataPayment[0])
        }

    }, [penguranganPaymentDuration])

    useEffect(() => {
        if (paymentConfirmasi.length !== 0) {
            checkTotalPayment(paymentConfirmasi)
        }
    }, [checkTotalPayment, paymentConfirmasi])
}

export default PaymentDuration