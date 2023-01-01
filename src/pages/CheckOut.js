import { useEffect, React } from "react";
import {
  LogoPolos,
  AlamatPengirim,
  DetailPesanan,
  ProductCheckOut,
} from "../components/checkout/index";
import { Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "../utils/icon";

const CheckOut = ({
  dataAddress,
  getOnAddress,
  productCheckOut,
  clearProductBag,
  updateCheckOut,
  OnOffFooter,
  loginAkunPelanggan,
  postPaymentConfirmation,
  onOffScrollBody,
}) => {
  // Footer Off
  useEffect(() => {
    OnOffFooter("off");
  }, [OnOffFooter]);

  // Function Today's Date
  const dateTime = () => {
    let showDate = new Date().getTime();
    return showDate;
  };

  // Function Delete Product di Keranjangs
  const deleteKeranjangs = product => {
    product.forEach(data => {
      clearProductBag(data);
    });
  };

  // Fucntion Submit Checkout
  const onSubmit = (totalHarga, ongkir) => {
    // Menampung Data Untuk Di Post Ke Api's
    const data = {
      durasiPembayaran: { menit: 10, detik: 0 },
      status: "confirmasi",
      idUser: loginAkunPelanggan[0].id,
      alamat: dataAddress[0],
      tanggalTransaksi: dateTime(),
      product: productCheckOut,
      totalHarga: totalHarga,
      ongkosKirim: ongkir,
    };
    // Function Post Api's To Payment Confirmasi
    postPaymentConfirmation(data);
    // Function Delete Api's Keranjangs
    deleteKeranjangs(productCheckOut);
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full mx-auto 2xl:w-[84.3rem] bg-white py-2 fixed top-0 shadow-[0px_2px_5px_0px] shadow-color-gray/50">
          <div className="w-[95%] 950:w-[55rem] mx-auto">
            <div className="flex items-center gap-2 sm:gap-[2rem]">
              <Link
                to={"/cart"}
                className=" text-color-primary hidden sm:inline sm:mb-4"
              >
                <LogoPolos
                  sizeIcon={"text-[2.5rem]"}
                  sizeText={"text-[1.5rem]"}
                />
              </Link>

              <Link to={"/cart"} className="inline sm:hidden">
                <FaLongArrowAltLeft className="text-xl text-color-gray" />
              </Link>

              <p className="capitalize font-semibold text-xl">Delivery</p>
            </div>
          </div>
        </div>

        <div className="w-full 2xl:w-[84.3rem] mt-[3rem] sm:mt-[5rem]">
          <div className="grid sm:grid-cols-[57%_43%] md:grid-cols-[65%_35%] sm:gap-4 w-[95%] 950:w-[55rem] mx-auto">
            <div>
              <div className="mt-[1.2rem] 768:mt-[1rem]">
                <AlamatPengirim
                  dataAddress={dataAddress}
                  loginAkunPelanggan={loginAkunPelanggan}
                  onOffScrollBody={onOffScrollBody}
                  getOnAddress={getOnAddress}
                />
              </div>
              <div className="mt-[1.2rem] 768:mt-[1rem]">
                <ProductCheckOut
                  productCheckOut={productCheckOut}
                  clearProductBag={clearProductBag}
                  updateCheckOut={updateCheckOut}
                />
              </div>
            </div>
            <div className="mt-[1.2rem] 768:mt-[1rem]">
              <DetailPesanan
                productCheckOut={productCheckOut}
                onSubmit={onSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
