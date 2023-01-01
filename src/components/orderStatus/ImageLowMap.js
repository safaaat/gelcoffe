import React from "react";
import { RiArrowRightSLine } from "../../utils/icon";
import { totalSemuaBag } from "../../utils/totalSemuaBag";

const ImageLowMap = ({ dataOrder }) => {
  let dataProduct = dataOrder[0].product;
  let sisaJumlah = dataProduct.length - 3;

  const filterProduct = dataProduct.filter((data, index) => {
    return index <= 2;
  });

  return (
    <>
      <button className="flex items-center justify-between bg-color-primary/30 rounded-full px-2 py-1 360:px-5 360:py-3 w-full">
        <div className="flex items-center">
          {filterProduct.map(product => (
            <div key={product.id} className="img-low-pesanan ">
              <img
                src={
                  process.env.PUBLIC_URL +
                  `/assets/images/${product.category.nama.toLowerCase()}/${
                    product.gambar
                  }`
                }
                alt={product.nama}
                className="w-[2rem] 412:w-[3rem] rounded-full"
              />
            </div>
          ))}

          {sisaJumlah >= 1 ? (
            <span className="bg-color-primary w-[2rem] h-[2rem] 412:w-[3rem] 412:h-[3rem] rounded-full flex items-center justify-center border-white border-2 text-white -ml-2 360:-ml-3 text-xs 412:text-base">
              +{sisaJumlah}
            </span>
          ) : (
            ""
          )}

          <div className="text-color-primary ml-2 text-xs 412:text-sm grid justify-items-start text-start">
            <p>View order details</p>
            <p>{totalSemuaBag(dataProduct)} Products</p>
          </div>
        </div>

        <div className="text-color-primary text-2xl">
          <RiArrowRightSLine className="-mr-[5px]" />
        </div>
      </button>
    </>
  );
};

export default ImageLowMap;
