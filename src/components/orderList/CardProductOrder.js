import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { filterOrderList } from "../../utils/filterOrderList";
import { confertTanggal } from "../../utils/confertTanggal";
import { confertJam } from "../../utils/confertJam";
import { changeToRp } from "../../utils/confertToRp";
import { FaInfo } from "../../utils/icon";
import { formatDuration } from "../../utils/formatDuration";
import { DisplayProductOrder } from "./index";

// Function Display Time Confirmasi
const DisplayTimeConfirmasi = ({ data, updateIdConfirmasi }) => {
  if (data.status === "confirmasi") {
    return (
      <div className="parent_dis-tim-confi bg-color-primary/20">
        <div className="content_dis-tim-confi">
          Complete the payment in:
          <h6 className="text-sm font-medium flex items-center gap-1 sm:gap-2">
            <p>00 hours</p>
            <span>:</span>
            <p className="flex gap-1">
              {formatDuration(data.durasiPembayaran.menit)} minutes
            </p>
            <span>:</span>
            <p className="flex gap-1">
              {formatDuration(data.durasiPembayaran.detik)} seconds
            </p>
          </h6>
        </div>

        <button
          className="capitalize w-full sm:w-auto bg-color-primary px-3 py-1 text-white rounded-md transition-all duration-300 hover:bg-color-hover-btn"
          onClick={() => updateIdConfirmasi(data.id)}
        >
          payment Confirmation
        </button>
      </div>
    );
  }

  if (data.status === "wait") {
    return (
      <div className="parent_dis-tim-confi bg-yellow-200/80">
        <p className="content_dis-tim-confi">
          Please wait, the admin is checking your payment.
        </p>
      </div>
    );
  }
};

const DisplayEmpty = () => {
  return (
    <div className="w-[17rem] mt-4 grid justify-items-center mx-auto">
      <img
        src={process.env.PUBLIC_URL + "/assets/images/loading/empety-order.png"}
        alt="Display-Empty"
      />
      <h5 className="font-medium text-lg text-center sm:text-xl">
        No orders yet
      </h5>
      <p className="text-color-gray text-center">
        Shop for your needs now or view the Done page.
      </p>
      <Link
        to={"/category"}
        className="bg-color-primary text-white px-5 py-2 rounded-lg mt-4"
      >
        Shop now
      </Link>
    </div>
  );
};

const MapDataProduct = ({ dataConfirmasi, updateIdConfirmasi }) => {
  // Function Check Status
  const status = value => {
    // Jika status sama dengan confirmasi Kembalikan Nilai Waiting for payment.
    if (value === "confirmasi")
      return <p className="text bg-orange-400/80 px-5">Waiting for payment</p>;
    if (value === "wait")
      return <p className="text bg-yellow-400/80 px-[4.5rem]">Wait</p>;
    if (value === "completed")
      return <p className="text bg-green-400/80 px-5">Completed</p>;
    if (value === "cansel")
      return <p className="text bg-red-400/80 px-5">Cansel</p>;
  };

  return (
    <>
      {dataConfirmasi.length === 0 ? (
        <DisplayEmpty />
      ) : (
        <div className="grid gap-[2rem]">
          {dataConfirmasi.map(data => (
            <div
              key={data.id}
              className="shadow-[0px_0px_5px_0px] shadow-color-gray/50 bg-gray-200/40 w-full px-2 360:px-6 py-3 rounded-xl"
            >
              {/* Parent Content Info */}
              <div className="parent_card-order">
                {/* Content Info */}
                <h6 className="text-content">
                  {/* Nomor Inv */}
                  Order Number:
                  <p className="text">{data.id}</p>
                </h6>
                <h6 className="text-content">
                  {/* Tanggal */}
                  Transaction date:
                  <div className="content-date">
                    <p className="text">
                      {confertTanggal(data.tanggalTransaksi)},
                    </p>
                    <p className="text">{confertJam(data.tanggalTransaksi)}</p>
                  </div>
                </h6>
                <h6 className="text-content">
                  {/* Status */}
                  Status:
                  {status(data.status)}
                </h6>
                <h6 className="text-content">
                  {/* Total Pembayaran */}
                  Total payment:
                  <p className="text">
                    Rp{changeToRp(data.ongkosKirim + data.totalHarga)}
                  </p>
                </h6>

                {/* Icon Info */}
                <button className="orderlist_icon">
                  <FaInfo />
                </button>
              </div>

              {/* Durasi Waktu Confirmasi pembayaran Untuk Status Confirmasi */}
              <DisplayTimeConfirmasi
                data={data}
                updateIdConfirmasi={updateIdConfirmasi}
              />

              {/* Menampilkan Semua Product Yang Di Order */}
              <DisplayProductOrder
                dataProduct={data.product}
                status={data.status}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const CardProductOrder = ({
  paymentConfirmasi,
  status,
  updateIdConfirmasi,
}) => {
  // State Data Yang Memiliki Status Confirmasi
  const [dataConfirmasi, setDataConfirmasi] = useState(null);

  useEffect(() => {
    // Product Yang Sudah Di Filter
    let data = filterOrderList(paymentConfirmasi, status);

    // Memanggil Function Confirmasi
    setDataConfirmasi(data);
  }, [paymentConfirmasi, status]);

  return (
    <>
      <div className="mt-3">
        {dataConfirmasi === null ? (
          <p className="py-[10rem]"></p>
        ) : (
          // Data Product Order
          <MapDataProduct
            dataConfirmasi={dataConfirmasi}
            updateIdConfirmasi={updateIdConfirmasi}
          />
        )}
      </div>
    </>
  );
};

export default CardProductOrder;
