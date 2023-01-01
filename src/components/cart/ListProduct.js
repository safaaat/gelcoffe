import { useState, React, useEffect, useCallback, useRef } from "react";
import {
  BsCheckLg,
  MdOutlineBorderColor,
  IoMdAddCircleOutline,
  AiOutlineMinusCircle,
  ImBin,
} from "../../utils/icon";
import { changeToRp } from "../../utils/confertToRp";
import { totalHargaBag, totalSemuaBag } from "../../utils/totalSemuaBag";
import MobileCheckout from "./MobileCheckout";
import BackMobile from "./BackMobile";
import AddAddress from "./AddAddress";
import DaftarAddress from "./DaftarAddress";
import { Navigate } from "react-router-dom";

function ListProduct({
  keranjangs,
  clearProductBag,
  putAddMinProduct,
  dataAddress,
  loginAkunPelanggan,
  getOnAddress,
  showFromRegister,
  updateAuthPrevRout,
  updateCheckOut,
  updateOnOffNavbar,
}) {
  const [product, setProduct] = useState([]);
  // Nampung Value CheckBox
  const [checkeds, setCheckeds] = useState([]);
  // State CSS Scroll
  const [classScroll, setClassScroll] = useState("detail-order top-0");
  const [allSelect, setAllSelect] = useState(true);
  // State Active Form
  const [active, setActive] = useState({ form: false, daftarAddress: false });
  // Link CheckOut
  const [checkOut, setCheckOut] = useState(null);
  // Ref Dimensi Element
  const ref = useRef(null);

  const handleToggle = value => {
    if (value === "allSelect") {
      if (allSelect === true) {
        setAllSelect(false);
        setCheckeds([]);
      } else {
        setAllSelect(true);
        setCheckeds([...keranjangs]);
      }
    } else {
      const currentIndex = checkeds.indexOf(value);
      const newChecked = [...checkeds];
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
        setAllSelect(false);
      }
      setCheckeds(newChecked);
    }
  };

  const formatTotalHarga = useCallback(value => {
    // Total Harga
    let harga = totalHargaBag(value);
    // Format Harga
    harga = changeToRp(harga);
    return harga;
  }, []);

  useEffect(() => {
    setCheckeds(keranjangs);
    setProduct(keranjangs);
  }, [keranjangs, formatTotalHarga]);

  const handleSubmit = event => {
    event.preventDefault();
  };

  const changeJumlahProduct = (product, angka) => {
    // Menampung Product
    let data = product;
    // Menampung Jumlah
    let jumlah = product.jumlah;
    // Update Jumlah
    jumlah = { jumlah: jumlah + angka };
    // Update Product
    data = { ...data, ...jumlah };

    if (product.jumlah === 1 && angka === -1) return data;
    return putAddMinProduct(data, product.id);
  };

  // Order Detail Scroll
  useEffect(() => {
    // Ketika Aplikasi Pertama Dijalanakan, Class Ini Yang Akan Dipanggil
    setClassScroll("detail-order top-0");
    // Effect Scroll Detail Order
    const onScroll = () => {
      if (window.scrollY > 30 && window.scrollY < ref.current.clientHeight) {
        setClassScroll("detail-order_scroll");
      } else if (window.scrollY >= ref.current.clientHeight) {
        setClassScroll("detail-order bottom-0");
      } else {
        setClassScroll("detail-order top-0");
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On Off Form Add Address
  const onOffAddress = value => {
    setActive(prev => {
      return { ...prev, ...value };
    });
  };

  // Function Submit Checkout
  const submitCheckout = () => {
    if (dataAddress.length === 0) return onOffAddress({ daftarAddress: true });
    if (checkeds.length !== 0) {
      updateAuthPrevRout({ checkOut: true });
      updateCheckOut(checkeds);
      return setCheckOut(true);
    }
  };

  const changeOnOffNavbar = useCallback(() => {
    if (window.outerWidth <= 768) return updateOnOffNavbar("off");
    return updateOnOffNavbar("on");
  }, [updateOnOffNavbar]);

  useEffect(() => {
    changeOnOffNavbar();
    window.addEventListener("resize", changeOnOffNavbar);
    return () => window.removeEventListener("resize", changeOnOffNavbar);
  }, [changeOnOffNavbar]);

  return (
    <>
      <div className="w-full 2xl:w-[84.3rem] mx-auto bg-gray-100/50">
        <div className="mx-auto w-[90%]">
          <div className="list-product mt-[6.5rem] md:mt-0">
            <form onSubmit={handleSubmit}>
              <div className="parent_select-all">
                <label className="relative flex justify-center items-center w-[1.3rem]">
                  <input
                    className="relative before:absolute before:left-[1.1rem] before:bg-transparent before:w-[9rem] before:h-[1.2rem] before:cursor-pointer before:top-[-2px]"
                    type="checkbox"
                    value={"allSelect"}
                    name="allSelect"
                    checked={
                      checkeds.length === keranjangs.length ? true : false
                    }
                    onChange={() => handleToggle("allSelect")}
                  />
                  <BsCheckLg className="icon cursor-pointer" />
                </label>
                <p className="text-color-gray/90 capitalize cursor-default font-medium">
                  select all products
                </p>
              </div>

              {/* Product */}
              <div className="container_product-cart" ref={ref}>
                {product.map(product => (
                  <div key={product.product_id} className="parent_product">
                    <div className="product-cart">
                      <label className="relative flex items-center justify-center">
                        <input
                          type="checkbox"
                          value={product}
                          name={product.name}
                          checked={
                            checkeds.indexOf(product) === -1 ? false : true
                          }
                          onChange={() => handleToggle(product)}
                        />
                        <BsCheckLg className="icon" />
                      </label>
                      {/* Img Product */}
                      <div className="data-product">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            `/assets/images/${product.category.nama.toLowerCase()}/${
                              product.gambar
                            }`
                          }
                          alt={`${product.nama}`}
                          className="img-cart"
                        />
                        {/* Data Product */}
                        <div>
                          <p className="nama-product">{product.nama}</p>
                          <h3 className="harga-product">
                            Rp{changeToRp(product.harga)}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="parent_button mt-[-.5rem] sm:mt-0">
                      {/* Button Hapus */}
                      <button
                        className="text-color-gray transition-all duration-300 hover:text-red-500 sm:absolute sm:top-0 sm:text-lg md:text-xl"
                        onClick={() => clearProductBag(product)}
                      >
                        <ImBin />
                      </button>
                      {/* Line */}
                      <div className="text-color-gray cursor-default sm:hidden">
                        |
                      </div>
                      {/* Button Add And Min Jumlah */}
                      <div className="parent_min-add">
                        {/* Button - */}
                        <button
                          className={
                            product.jumlah === 1
                              ? "btn_min-add_block"
                              : "btn_min-add"
                          }
                          onClick={() => changeJumlahProduct(product, -1)}
                        >
                          <AiOutlineMinusCircle />
                        </button>
                        {/* Jumlah Product */}
                        <p className="jumlah">{product.jumlah}</p>
                        {/* Button + */}
                        <button
                          className="btn_min-add"
                          onClick={() => changeJumlahProduct(product, 1)}
                        >
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
              <div className={`${classScroll}`}>
                <h5 className="flex items-center text-gray-600 gap-2">
                  <MdOutlineBorderColor className="text-gray-500/80" />
                  Order details
                </h5>
                <div className="bg-white px-2 py-3 shadow-md shadow-gray-500/20 rounded-md mt-1">
                  <div className="flex justify-between font-semibold text-sm">
                    <p>Total</p>
                    <p className="text-black">Rp{formatTotalHarga(checkeds)}</p>
                  </div>
                  <button
                    className={
                      checkeds.length === 0
                        ? "btn-checkout bg-gray-300 py-[10px] px-4 mt-3 cursor-not-allowed"
                        : "btn-checkout bg-color-primary hover:bg-color-hover-btn py-[10px] px-4 mt-3 cursor-pointer"
                    }
                    onClick={() => submitCheckout()}
                  >
                    Checkout ({totalSemuaBag(checkeds)})
                  </button>

                  {checkOut && <Navigate to="/checkout" replace={true} />}
                </div>
              </div>
            </div>

            {/* Back Mobile */}
            <div className="relative">
              <BackMobile
                dataAddress={dataAddress}
                onOffAddress={onOffAddress}
              />
            </div>

            {/* CheckOut Mobile */}
            <div className="relative">
              <MobileCheckout
                checkeds={checkeds}
                totalHarga={formatTotalHarga(checkeds)}
                keranjangs={keranjangs}
                handleToggle={handleToggle}
                submitCheckout={submitCheckout}
              />
            </div>

            {/* Daftar Address */}
            <DaftarAddress
              dataAddress={dataAddress}
              loginAkunPelanggan={loginAkunPelanggan}
              onOffAddress={onOffAddress}
              active={active}
              getOnAddress={getOnAddress}
              showFromRegister={showFromRegister}
            />

            {/* From Address */}
            {!active.form ? (
              ""
            ) : (
              <AddAddress
                loginAkunPelanggan={loginAkunPelanggan}
                onOffAddress={onOffAddress}
                getOnAddress={getOnAddress}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListProduct;
