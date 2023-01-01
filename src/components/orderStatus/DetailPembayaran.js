import React from "react";
import { changeToRp } from "../../utils/confertToRp";
import { IoClose } from "../../utils/icon";

const DetailPembayaran = ({ dataOrder, onClickDetailPayment, active }) => {
    return (
        <>
            <div className={!active ? "bg_black-detail-payment" : "bg_black-detail-payment-aktif"}>
                <div className={!active ? "form_white-detail-payment" : "form_white-detail-payment-aktif"}>
                    {/* Button Close */}
                    <div className="flex justify-end mt-1">
                        <button className="text-2xl hover:text-red-500 transition-all duration-300" onClick={() => onClickDetailPayment({ formDetailPayment: false })}>
                            <IoClose />
                        </button>
                    </div>
                    <h5 className="mt-[.5rem] 360:mt-[1.5rem] capitalize font-bold text-lg">Payment details</h5>
                    <div>
                        {dataOrder.map((data) => (
                            <div key={data.id} className="shadow-[0px_0px_4px_0px] shadow-color-gray/30 px-4 py-3 grid gap-1 rounded-xl mt-3">
                                <div className="flex justify-between items-center text-color-gray">
                                    <p>Total price</p>
                                    <span>Rp{changeToRp(data.totalHarga)}</span>
                                </div>
                                <div className="flex justify-between items-center text-color-gray">
                                    <p>Shipping cost:</p>
                                    <span>Rp{changeToRp(data.ongkosKirim)}</span>
                                </div>
                                <div className="line bg-color-gray/30 my-2"></div>
                                <div className="flex justify-between items-center font-semibold">
                                    <p>Total payment:</p>
                                    <span className="text-color-primary">Rp{changeToRp(data.totalHarga + data.ongkosKirim)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailPembayaran