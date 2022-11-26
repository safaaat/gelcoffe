import React from 'react'

function EmptyBag() {
    return (
        <div className="py-5">
            {/* Image */}
            <div className="w-[15rem] mx-auto">
                <img src={process.env.PUBLIC_URL + "/assets/images/home/keranjang.png"} alt="Empty Bag" className="ml-2" />
            </div>

            {/* Text Content */}
            <div>
                <h3 className="font-bold text-black text-center">
                    Your bag is still empty
                </h3>
                <p className="text-center w-[18rem] mx-auto leading-6 mt-2">If there is something that fits your heart,
                    just add it here!</p>
            </div>
        </div>
    )
}

export default EmptyBag