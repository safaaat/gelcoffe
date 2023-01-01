import React from "react";
import { Confirmasi, Cansel, Completed, Wait } from "./index";
import { RiArrowRightSFill } from "../../utils/icon";
import { changeToRp } from "../../utils/confertToRp";

const StatusPembayaran = ({ dataOrder, onClickDetailPayment, updateIdConfirmasi }) => {

    const onConfiramsi = (id) => {
        updateIdConfirmasi(id)
        setTimeout(() => {
            updateIdConfirmasi([])
        }, [2000])
    }

    return (
        <>
            <div className="w-full md:shadow-[0px_0px_5px_0px] md:shadow-color-gray/50 md:rounded-2xl overflow-hidden">
                <div className="grid justify-items-center">
                    <svg data-v-4a0dc1a2="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 367" className="bg-transparent h-[13rem] mt-[-1rem] md:mt-[-3rem] overflow-hidden rounded-2xl">
                        <path d="M595.65 164.23s193.23-.2 268.73 87c39.74 45.9 57.13 101.35 157.47 101.35 111.01 0 111.01-53.67 154.99-92.48 97.15-85.72 278.55-96.42 278.55-96.42H2048V.58H0v163.65h595.65z" fill="#c4fad8"></path>
                    </svg>

                    {/* Untuk Status Confirmasi */}
                    {dataOrder[0].status === "confirmasi"
                        ? <Confirmasi dataOrder={dataOrder} />
                        : ""
                    }

                    {/* Untuk Status Wait */}
                    {dataOrder[0].status === "wait"
                        ? <Wait dataOrder={dataOrder} />
                        : ""
                    }

                    {/* Untuk Status Cansel */}
                    {dataOrder[0].status === "cansel"
                        ? <Cansel dataOrder={dataOrder} />
                        : ""
                    }

                    {/* Untuk Status Completed */}
                    {dataOrder[0].status === "completed"
                        ? <Completed dataOrder={dataOrder} />
                        : ""
                    }
                </div>

                {/* Data Total Payment */}
                <div className="w-[90%] mx-auto mt-[1.5rem] mb-[1.5rem]">
                    {dataOrder.map((data) => (
                        <div key={data.id}>
                            <div className="shadow-[0px_0px_5px_0px] shadow-color-gray/50 rounded-lg px-3 py-3">
                                {/* Total Harga */}
                                <div className="flex justify-between">
                                    <p className="capitalize">Total payment:</p>
                                    <span className="font-medium">
                                        Rp{changeToRp(data.totalHarga)}
                                    </span>
                                </div>
                                {/* Line */}
                                <div className="line bg-color-gray/40 my-3"></div>
                                {/* Button */}
                                <button className="text-color-primary font-medium flex items-center justify-between w-full transition-all duration-300 hover:text-color-hover-btn" onClick={() => onClickDetailPayment({ formDetailPayment: true })}>
                                    <p>See payment details</p>
                                    <RiArrowRightSFill className="text-xl" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Button Confirmasi Pembayaran */}
                {dataOrder[0].status === "confirmasi"
                    ? <div className="w-[90%] mx-auto mb-[1.5rem]">
                        <button className="bg-color-primary hover:bg-color-hover-btn transition-all duration-300 text-center capitalize w-full py-2 text-white rounded-md" onClick={() => onConfiramsi(dataOrder[0].id)}>
                            payment confirmation
                        </button>
                    </div>
                    : ""
                }
            </div>
        </>
    )
}

export default StatusPembayaran