import React from "react";

const LoadingAddData = () => {
    return (
        <>
            <div className="relative">
                <div className="fixed top-0 left-0 bg-black/50 w-full h-screen z-[1000] flex justify-center items-center">
                    <div className="bg-color-hover-btn py-[.5rem] rounded-lg px-[1rem] flex items-center gap-2 text-white">
                        <div className="parent-roll">
                            <div className="loading-roll"></div>
                        </div>
                        <p>Loading...</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoadingAddData