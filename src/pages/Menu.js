import React from "react";
import { CardProduct, Loading } from "../components/menu/index";

const Menu = ({ products, addCart, loadingMenu, updateHaightCategory }) => {
  return (
    <div className="w-full 2xl:w-[85.4rem] mx-auto mb-[5rem]">
      {/* <div className="bg-[#063f06] w-full h-[6.5rem] md:h-[8rem] lg:h-[9rem]"></div> */}
      <div className="w-[90%] mx-auto px-1 mt-[1rem]">
        <div>
          {loadingMenu ? (
            <CardProduct
              products={products}
              addCart={addCart}
              updateHaightCategory={updateHaightCategory}
            />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
