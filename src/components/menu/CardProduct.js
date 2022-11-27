import React from "react";
import { FaCheese, DiCoffeescript, MdFastfood, BiDrink } from "../../utils/icon";
import { changeToRp } from "../../utils/confertToRp";

const Icon = ({ category }) => {
    // Snack
    if (category === "Cemilan") return <div className="parent_menu-category bg-red-200 text-red-600"><div className="flex items-center gap-1"><FaCheese className="text-[9px]" /><p className="text-category">snack</p></div></div>
    // Juice
    if (category === "Juice") return <div className="parent_menu-category bg-fuchsia-200 text-fuchsia-600"><div className="flex items-center gap-1"><BiDrink className="text-[10px]" /><p className="text-category">juice</p></div></div>
    //  Coffe
    if (category === "Coffe") return <div className="parent_menu-category bg-[#fdd68d] text-[#cf9831]"><div className="flex items-center gap-1"><DiCoffeescript className="text-[15px]" /><p className="text-category">coffe</p></div></div>
    // Food
    if (category === "Makanan") return <div className="parent_menu-category bg-blue-200 text-blue-600"><div className="flex items-center gap-1"><MdFastfood className="text-[11px]" /><p className="text-category">food</p></div></div>
}

function CardProduct({ products, addCart }) {

    return (
        <>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[.5rem] relative my-10">
                {products.map((product) => (
                    <li key={product.id} className="card-menu group relative z-[0] hover:z-[1] transition-all duration-300">
                        {/* Image */}
                        <div className="overflow-hidden rounded-lg 360:rounded-t-3xl">
                            <img src={process.env.PUBLIC_URL + `/assets/images/${product.category.nama.toLowerCase()}/${product.gambar}`} alt={product.nama} className="group-hover:scale-110 transition-all duration-300" />
                        </div>

                        {/* Text Contain */}
                        <div className="px-3 py-2 leading-[10px]">
                            {/* Icon Category */}
                            <Icon category={product.category.nama} />
                            {/* Nama Product */}
                            <h3 className="nama_product relative z-10">{product.nama}</h3>
                            {/* Harga */}
                            <h2 className="menu-harga relative z-10">Rp {changeToRp(product.harga)}</h2>
                            {/* Button */}
                            <div className="parent-btn">
                                <button className="menu-btn" onClick={() => addCart(product)}>add to bag</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default CardProduct