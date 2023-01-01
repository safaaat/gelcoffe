import React from "react";

const Empty = () => {
  return (
    <>
      <div className="flex flex-col py-[5rem] sm:py-[7rem]">
        <img
          src={process.env.PUBLIC_URL + "/assets/images/home/search-empety.png"}
          alt="Search-Empty"
          className="w-[15rem] sm:w-[20rem] mx-auto"
        />
        <h4 className="font-medium text-lg text-center">
          The product doesn't exist yet
        </h4>
        <p className="text-color-gray text-center px-2">
          Please try other search words to find the product you are looking for.
        </p>
      </div>
    </>
  );
};

export default Empty;
