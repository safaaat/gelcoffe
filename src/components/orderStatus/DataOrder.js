import React from "react";
import { Link } from "react-router-dom";
// Untuk Convert Milliseconds Menjadi Jam
import { confertJam } from "../../utils/confertJam";
// Untuk Convert Milliseconds Menjadi Tanggal
import { confertTanggal } from "../../utils/confertTanggal";
// Componen Image Low Pada Order
import { ImageLowMap } from "./index";

const DataOrder = ({ dataOrder }) => {
    // Destructuring Objek Di Dalam Array, Untuk Mengakseses Data Alamat.
    const { alamat } = dataOrder[0];

    return (
        <>
            <div className="w-[90%] md:w-full mx-auto">
                <div className="shadow-[0px_0px_5px_0px] shadow-color-gray/50 rounded-xl py-3">
                    {dataOrder.map((data) => (
                        <div key={data.id}>
                            <div className="flex justify-between items-center text-sm px-5">
                                <div className="flex gap-2 text-sm 412:text-base">
                                    {/* Nomor Order */}
                                    <p className="text-color-gray">No. order:</p>
                                    <span>{data.id}</span>
                                </div>
                                {/* Data Tanggal, Jam */}
                                <div className="font-medium text-sm 412:text-base 500:flex 500:gap-1">
                                    <div className="flex">
                                        <p>{confertTanggal(data.tanggalTransaksi)}</p>
                                        <span className="hidden 500:inline">,</span>
                                    </div>
                                    <p className="text-end 500:text-start">{confertJam(data.tanggalTransaksi)} WIB</p>
                                </div>
                            </div>
                            {/* Line Transparans */}
                            <div className="line bg-color-gray/30 my-3"></div>

                            <div className="px-5">
                                {/* Judul */}
                                <h5 className="text-lg font-semibold capitalize mb-2">order</h5>
                                {/* Data Image Order */}
                                <ImageLowMap dataOrder={dataOrder} />
                                {/* Line Transparans */}
                                <div className="line bg-color-gray/30 my-3"></div>
                            </div>

                            {/* Data Address */}
                            <div className="px-5 mb-2">
                                <h5 className="text-base font-semibold capitalize mb-2">Shipping address</h5>
                                <div className="flex items-center gap-2">
                                    {/* Nama */}
                                    <div className="flex gap-1 text-black">
                                        <p className="hidden 412:inline">Recipient's name :</p>
                                        <span className="capitalize">{alamat.nama}</span>
                                    </div>
                                    {/* Line Vertikal */}
                                    <div className="line-vertikal bg-color-gray/30"></div>
                                    {/* Nomor HandPhone */}
                                    <p className="text-color-gray text-sm">{alamat.nomorhp}</p>
                                </div>
                                {/* Alamat Lengkap */}
                                <p className="text-color-gray text-sm">{alamat.alamatLengkap}</p>
                                {/* Parent Data Kota,Kecamatan,Dan Kode Pos */}
                                <div className="flex items-center gap-1 text-xs text-color-gray/70">
                                    <p>{alamat.kota},</p>
                                    <p>{alamat.kecamatan},</p>
                                    <p>{alamat.kodePos}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Button Black To Beranda */}
                <div className="mt-[2rem] flex justify-center">
                    <Link to={"/"}
                        className="bg-color-primary/20 px-4 py-2 capitalize text-color-primary rounded-lg hover:text-white hover:bg-color-primary transition-all duration-300"
                    >
                        back to the porch
                    </Link>
                </div>
            </div>
        </>
    )
}

export default DataOrder