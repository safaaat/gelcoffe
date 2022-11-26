import React from "react"
const loopData = [1, 2, 3, 4, 5, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

function Loading() {
    return (
        <div className=" flex justify-center animate-pulse">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 w-full">
                {loopData.map((data, index) => (
                    <div key={index} className="bg-gray-50 w-full shadow-black/30 shadow-md px-2 py-2 rounded-lg">
                        <div className="bg-gray-200 w-[7.5rem] 360:w-[8.5rem] 414:w-[100%]  xl:w-[11rem] h-[8rem] 360:h-[9rem] 414:h-[11rem] rounded-t-lg"></div>
                        <div className="bg-gray-200 w-[3rem] 360:w-[4.5rem] h-[.6rem] rounded-md mt-1"></div>
                        <div className="bg-gray-200 w-[5rem] 360:w-[6rem] h-[1rem] rounded-md mt-3"></div>
                        <div className="bg-gray-200 w-[6.5rem] 360:w-[7.5rem] h-[1.2rem] rounded-md mt-1"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Loading