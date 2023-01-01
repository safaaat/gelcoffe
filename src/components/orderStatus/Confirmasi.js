import React from "react"

const Confirmasi = ({ dataOrder }) => {
    const formatAngka = (value) => {
        if (value < 10) return <h5>0{value}</h5>
        return <h5>{value}</h5>
    }

    return (
        <div className="w-[90%] mt-[-6rem]">
            {/* Time */}
            <div className="grid justify-items-center bg-white/50 px-6 py-2 rounded-2xl">
                {dataOrder.map((data) => (
                    <div key={data.id} className="flex items-center gap-2 text-[2.8rem] font-semibold mt-[-1rem]">
                        <div>00</div>
                        <span>:</span>
                        <div className="flex gap-3">{formatAngka(data.durasiPembayaran.menit)}</div>
                        <span>:</span>
                        <div className="flex gap-3">{formatAngka(data.durasiPembayaran.detik)}</div>
                    </div>
                ))}

                <div className="flex capitalize text-sm gap-[2.8rem] text-black/50 mt-[-.3rem]">
                    <p>jam</p>
                    <p>menit</p>
                    <p>detik</p>
                </div>
            </div>

            {/* Text */}
            <div className="grid justify-items-center mt-[1.5rem]">
                <h5 className="text-2xl font-semibold capitalize italic text-center">Waiting for payment</h5>
                <p className="text-center text-black/50 mt-1">Complete your payment to avoid automatic cancellation.</p>
            </div>
        </div>
    )
}

export default Confirmasi