import React from "react";
import { totalSemuaBag, totalHargaBag } from "../../../utils/totalSemuaBag";
import { changeToRp } from "../../../utils/confertToRp";
import { ImBin } from "../../../utils/icon";

function KeranjangMenu({ keranjangs, clearProductBag }) {
    let totalHarga = totalHargaBag(keranjangs);
    return (
        <div>
            <ul className="w-[100%] mx-auto max-h-[21rem] overflow-auto grid gap-2 py-3">
                {keranjangs.map((product) => (
                    <li key={product.id} className="px-[1rem]">
                        <div className="flex gap-3 hover:bg-gray-300/30 p-3 rounded-lg cursor-pointer" >
                            <img src={process.env.PUBLIC_URL + `/assets/images/${product.category.nama.toLowerCase()}/${product.gambar}`} alt={product.nama} className="w-[4rem]" />
                            <p className="capitalize w-[14.2rem] text-gray-900 text-lg">{product.nama}</p>
                            <div className="w-[7rem]">
                                <h3 className="text-end text-black font-semibold">Rp{changeToRp(product.harga)}</h3>
                                <div className="flex items-center justify-between text-sm pl-3">
                                    <h4 className=" text-sm">Jumlah:{product.jumlah}</h4>
                                    <button className="hover:text-red-500 transition-all duration-300" onClick={() => clearProductBag(product)}>
                                        <ImBin />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {/* Line */}
            <span className="bg-gray-400 w-full h-[1px] grid"></span>

            <div className="flex justify-between w-[90%] mx-auto py-3">
                <h3>Total ({totalSemuaBag(keranjangs)} Products):</h3>
                <h3 className="text-color-black font-bold">Rp{changeToRp(totalHarga)}</h3>
            </div>
        </div>
    )
}

export default KeranjangMenu