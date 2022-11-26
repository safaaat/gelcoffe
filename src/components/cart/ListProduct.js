import { useState, React, useEffect, useCallback } from "react";
import { BsCheckLg, MdOutlineBorderColor, IoMdAddCircleOutline, AiOutlineMinusCircle, ImBin } from "../../utils/icon";
import { changeToRp } from "../../utils/confertToRp";
import { totalHargaBag } from "../../utils/totalSemuaBag";
// import { TotalHargaMobile } from "../cart/index";

function ListProduct({ keranjangs, clearProductBag, putAddMinProduct }) {
    const [product, setProduct] = useState([]);
    const [checkeds, setCheckeds] = useState([]);
    const [classScroll, setClassScroll] = useState("")
    const [allSelect, setAllSelect] = useState(true)

    const handleToggle = (value) => {
        if (value === "allSelect") {
            if (allSelect === true) {
                setAllSelect(false)
                setCheckeds([])
            } else {
                setAllSelect(true)
                setCheckeds([...keranjangs])
            }
        } else {
            const currentIndex = checkeds.indexOf(value);
            const newChecked = [...checkeds];
            if (currentIndex === -1) {
                newChecked.push(value);
            } else {
                newChecked.splice(currentIndex, 1);
                setAllSelect(false)
            }
            setCheckeds(newChecked)
        }

    }

    console.log(checkeds)

    const formatTotalHarga = useCallback((value) => {
        // Total Harga
        let harga = totalHargaBag(value);
        // Format Harga
        harga = changeToRp(harga);
        return harga
    }, [])

    useEffect(() => {
        setCheckeds(keranjangs);
        setProduct(keranjangs);
    }, [keranjangs, formatTotalHarga])

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    const changeJumlahProduct = (product, angka) => {
        // Menampung Product
        let data = product
        // Menampung Jumlah
        let jumlah = product.jumlah;
        // Update Jumlah
        jumlah = { jumlah: jumlah + angka }
        // Update Product
        data = { ...data, ...jumlah }

        if (product.jumlah === 1 && angka === -1) return data
        return putAddMinProduct(data, product.id)
    }

    // Order Detail Scroll
    useEffect(() => {
        const onScroll = () => {
            console.log(window.scrollY)
            if (window.scrollY > 30 && window.scrollY < 1443) {
                setClassScroll("detail-order_scroll");
            } else if (window.scrollY >= 1443) {
                setClassScroll("detail-order bottom-0");
            } else {
                setClassScroll("detail-order top-0");
            }
        }

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <>
            <div className="w-full 2xl:w-[84.3rem] mx-auto bg-gray-100/50">
                <div className="mx-auto w-[90%]">
                    <div className="list-product">
                        <form onSubmit={handleSubmit}>
                            <div className="parent_select-all">
                                <label className="relative flex justify-center items-center w-[1.3rem]">
                                    <input
                                        className="relative before:absolute before:left-[1.1rem] before:bg-transparent before:w-[9rem] before:h-[1.2rem] before:cursor-pointer before:top-[-2px]"
                                        type="checkbox"
                                        value={"allSelect"}
                                        name="allSelect"
                                        checked={checkeds.length === keranjangs.length ? true : false}
                                        onChange={() => handleToggle("allSelect")}
                                    />
                                    <BsCheckLg className="icon cursor-pointer" />
                                </label>
                                <p className="text-color-gray/90 capitalize cursor-default font-medium">select all products</p>
                            </div>

                            {/* Product */}
                            <div className="grid bg-white px-4 rounded-xl shadow-xl shadow-gray-400/70 my-2">
                                {product.map((product) => (
                                    <div key={product.product_id} className="parent_product">
                                        <div className="product-cart">
                                            <label className="relative flex items-center justify-center">
                                                <input
                                                    type="checkbox"
                                                    value={product}
                                                    name={product.name}
                                                    checked={checkeds.indexOf(product) === -1 ? false : true}
                                                    onChange={() => handleToggle(product)}
                                                />
                                                <BsCheckLg className="icon" />
                                            </label>
                                            {/* Img Product */}
                                            <div className="data-product">
                                                <img src={process.env.PUBLIC_URL + `/assets/images/${product.category.nama.toLowerCase()}/${product.gambar}`} alt={`${product.nama}`} className="img-cart" />
                                                {/* Data Product */}
                                                <div>
                                                    <p className="nama-product">{product.nama}</p>
                                                    <h3 className="harga-product">Rp{changeToRp(product.harga)}</h3>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="parent_button">
                                            {/* Button Hapus */}
                                            <button className="text-color-gray transition-all duration-300 hover:text-red-500 sm:absolute sm:top-0 sm:text-lg md:text-xl" onClick={() => clearProductBag(product)}>
                                                <ImBin />
                                            </button>
                                            {/* Line */}
                                            <div className="text-color-gray cursor-default sm:hidden">|</div>
                                            {/* Button Add And Min Jumlah */}
                                            <div className="parent_min-add">
                                                {/* Button - */}
                                                <button className={product.jumlah === 1 ? "btn_min-add_block" : "btn_min-add"} onClick={() => changeJumlahProduct(product, -1)}>
                                                    <AiOutlineMinusCircle />
                                                </button>
                                                {/* Jumlah Product */}
                                                <p className="jumlah">{product.jumlah}</p>
                                                {/* Button + */}
                                                <button className="btn_min-add" onClick={() => changeJumlahProduct(product, 1)}>
                                                    <IoMdAddCircleOutline />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </form>

                        {/* Total Harga */}
                        <div className="relative w-full">
                            <div className={`${classScroll}`} >
                                <h5 className="flex items-center text-gray-600 gap-2">
                                    <MdOutlineBorderColor className="text-gray-500/80" />
                                    Order details
                                </h5>
                                <div className="bg-white px-2 py-3 shadow-md shadow-gray-500/20 rounded-md mt-1">
                                    <div className="flex justify-between font-semibold text-sm">
                                        <p>Total</p>
                                        <p className="text-black">Rp{formatTotalHarga(checkeds)}</p>
                                    </div>
                                    <button className="btn-checkout">
                                        Checkout
                                        ({checkeds.length})
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Total Harga Mobile */}
                        {/* <TotalHargaMobile totalHarga={30000} /> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListProduct