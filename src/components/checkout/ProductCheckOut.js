import React from "react";
import { BsHandbagFill, ImBin } from "../../utils/icon";
import { changeToRp } from "../../utils/confertToRp";
import { Navigate } from "react-router-dom";

const ProductCheckOut = ({ productCheckOut, clearProductBag, updateCheckOut }) => {

    const removeProduct = (product) => {
        firterProductToState(productCheckOut, product);
        clearProductBag(product);
    }

    const firterProductToState = (productCheckOut, product) => {
        const filter = productCheckOut.filter((productCheckOuts) => { return productCheckOuts.id !== product.id; })
        updateCheckOut(filter);
    }

    return (
        <>
            {/* Judul */}
            <div className="flex items-center gap-2 text-color-gray">
                <BsHandbagFill />
                <h4 className="capitalize">your order</h4>
            </div>
            {/* Product */}
            <ul className="mt-[.5rem] shadow-[0px_0px_5px_0px] shadow-color-gray/50 rounded-md">
                {productCheckOut.map((product) => (
                    <li key={product.id}>
                        <div className="flex justify-between px-4 py-3">
                            <div className="flex gap-2">
                                {/* Image Product */}
                                <div className="w-[7rem]">
                                    <img src={process.env.PUBLIC_URL + `/assets/images/${product.category.nama.toLowerCase()}/${product.gambar}`} alt={`${product.nama}`} />
                                </div>
                                {/* Data Product */}
                                <div>
                                    <h4 className="capitalize text-black font-semibold">{product.nama}</h4>
                                    <p className="text-gray-900">Rp{changeToRp(product.harga)}</p>
                                    <p className="text-color-gray text-sm">Total: {product.jumlah}</p>
                                </div>
                            </div>
                            {/* Button Remove Product */}
                            <div
                                className="text-color-gray transition-all duration-300 hover:text-red-500 cursor-pointer"
                                onClick={() => removeProduct(product)}
                            >
                                <ImBin />
                            </div>
                        </div>
                        <div className="w-full h-[1px] bg-color-gray/20"></div>
                    </li>
                ))}
            </ul>

            {/* Jika Semua Product Di Menu CheckOut Di Hapus Semua, Maka Program Akan Berpindah Ke Menu Cart */}
            {productCheckOut.length === 0 ? <Navigate to={"/cart"} /> : ""}
        </>
    )
}

export default ProductCheckOut