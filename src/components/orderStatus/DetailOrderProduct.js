import React from "react";
// import { changeToRp } from "../../utils/confertToRp";

const DetailOrderProduct = ({ dataOrder }) => {
    // Destructuring Data Product
    const { product } = dataOrder[0];

    return (
        <>
            <div className="fixed w-full left-0 top-0 h-screen bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
                <div className="absolute rounded-t-2xl -bottom-[.5rem] w-full h-[95%] sm:static sm:w-[90%] md:w-[80%] md:h-[80%] bg-white sm:rounded-2xl px-3 py-3 overflow-auto">
                    {/* Button Close */}
                    {/* <div className="flex justify-end py-[10px]">
                        <button className="text-sm 360:text-base bg-red-300 text-white py-1 px-3 rounded-md hover:bg-red-500 transition-all duration-300">
                            Close
                        </button>
                    </div> */}

                    <div className="">
                        {product.map((data) => (
                            <div key={data.id}>
                                <img src={process.env.PUBLIC_URL + `/assets/images/${data.category.nama.toLowerCase()}/${data.gambar}`} alt={data.nama} />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    )
}

export default DetailOrderProduct