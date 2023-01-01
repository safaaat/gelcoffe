import { React, useState } from "react";
import { StatusPembayaran, DetailPembayaran, DataOrder } from "./index";

const DataPayment = ({ dataOrder, updateIdConfirmasi }) => {
    const [active, setActive] = useState({ formDetailPayment: false })

    const onClickDetailPayment = (value) => {
        setActive((prev) => {
            return { ...prev, ...value }
        })
    }

    return (
        <>
            <div className="md:w-[90%] mx-auto">
                <div className="grid md:grid-cols-[42%_58%] lg:grid-cols-[32%_68%] gap-4 md:mt-[1rem] transition-all duration-300">
                    <StatusPembayaran dataOrder={dataOrder} onClickDetailPayment={onClickDetailPayment} updateIdConfirmasi={updateIdConfirmasi} />

                    <div className="line bg-color-gray/30 md:hidden my-3"></div>

                    <div><DataOrder dataOrder={dataOrder} /></div>
                </div>
            </div>

            <DetailPembayaran dataOrder={dataOrder} active={active.formDetailPayment} onClickDetailPayment={onClickDetailPayment} />
        </>
    )
}

export default DataPayment