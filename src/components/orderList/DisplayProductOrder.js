import React from "react";
import { changeToRp } from "../../utils/confertToRp";

const DisplayProductOrder = ({ dataProduct, status }) => {
  const displayStatus = value => {
    if (value === "wait")
      return <p className="status bg-yellow-400/80">{status}</p>;
    if (value === "confirmasi")
      return <p className="status bg-orange-400/80">{status}</p>;
    if (value === "confirmasi")
      return <p className="status bg-orange-400/80">{status}</p>;
    if (value === "cansel")
      return <p className="status bg-red-400/80">{status}</p>;
  };

  return (
    <>
      <ul className="bg-white/30 py-3 500:py-5 mt-[1rem] rounded-lg shadow-color-gray/50 shadow-[0px_0px_5px_0px]">
        {dataProduct.map(data => (
          <li key={data.id} className="parent_dis-pro-order">
            {/* Line */}
            <div className="line"></div>
            <div className="flex gap-3 px-3 500:px-5">
              {/* Image */}
              <img
                src={
                  process.env.PUBLIC_URL +
                  `/assets/images/${data.category.nama.toLowerCase()}/${
                    data.gambar
                  }`
                }
                alt={data.nama}
                className="img-dis-pro-order"
              />
              {/* Content Text */}
              <div className="flex flex-col justify-between">
                <div>
                  {displayStatus(status)}

                  <h3 className="capitalize font-medium text-sm 390:text-base 412:text-lg mt-1 412:mt-2">
                    {data.nama}
                  </h3>
                  <p className="flex gap-1 capitalize text-[.6rem] 390:text-[.7rem] mt-1">
                    jumlah:
                    <span>{data.jumlah}</span>
                  </p>
                </div>

                <p className="flex items-center gap-1 text-color-primary text-base 412:text-[1.1rem] mt-2 500:mt-0 500:text-lg">
                  Rp{changeToRp(data.harga)}
                  <span className="text-color-gray text-[.6rem] 412:text-[.65rem] 500:text-xs">
                    /Per'Product
                  </span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default DisplayProductOrder;
