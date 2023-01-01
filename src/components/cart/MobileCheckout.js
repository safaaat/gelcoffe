import React from "react";
import { BsCheckLg } from "../../utils/icon";
import Line from "../line/Line";
import { totalSemuaBag } from "../../utils/totalSemuaBag";

const MobileCheckout = ({
  checkeds,
  totalHarga,
  keranjangs,
  handleToggle,
  submitCheckout,
}) => {
  return (
    <>
      <div className="parent_checkout-mobile">
        <div className="flex items-center justify-between w-[90%] py-[10px] mx-auto">
          <div className="flex items-center">
            {/* CheckBox */}
            <div className="grid justify-items-center">
              <label className="relative flex justify-center items-center w-[1.3rem]">
                <input
                  className="relative before:absolute before:left-[0rem] before:bg-transparent before:w-[2.8rem] before:h-[1.2rem] before:cursor-pointer before:top-[1.2rem]"
                  type="checkbox"
                  value={"allSelect"}
                  name="allSelect"
                  checked={checkeds.length === keranjangs.length ? true : false}
                  onChange={() => handleToggle("allSelect")}
                />
                <BsCheckLg className="icon cursor-pointer" />
              </label>
              <p className="capitalize">semua</p>
            </div>

            {/* Line */}
            <Line />

            {/* Total Harga */}
            <div>
              <p className="capitalize font-semibold text-black">total</p>
              <h5 className="text-color-primary font-medium">Rp{totalHarga}</h5>
            </div>
          </div>

          {/* Button Checkout */}
          <div className="w-[6rem] 360:w-[8rem]">
            <button
              className={
                checkeds.length === 0
                  ? "btn-checkout bg-gray-300 cursor-not-allowed py-2 capitalize text-sm 360:text-base"
                  : "btn-checkout py-2 capitalize text-sm 360:text-base bg-color-primary hover:bg-color-hover-btn cursor-pointer"
              }
              onClick={() => submitCheckout()}
            >
              checkout ({totalSemuaBag(checkeds)})
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileCheckout;
