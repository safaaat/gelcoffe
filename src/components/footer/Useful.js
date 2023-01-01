import React from 'react'

function Useful() {
    return (
        <div className="mt-[1.5rem] 500:mt-[2rem] md:mt-0 md:text-end">
            <h3 className="footer_judul">Useful</h3>
            <div className="mt-[.5rem] 500:mt-[1rem] md:mt-[1.5rem] text-color-gray grid justify-items-start md:justify-items-end gap-1">
                <h5 className="text-gray-500 capitalize transition-all duration-500 hover:text-color-hover cursor-pointer">faq</h5>
                <h5 className="text-gray-500 capitalize transition-all duration-500 hover:text-color-hover cursor-pointer">whosale</h5>
                <h5 className="text-gray-500 capitalize transition-all duration-500 hover:text-color-hover cursor-pointer">careers</h5>
                <h5 className="text-gray-500 capitalize transition-all duration-500 hover:text-color-hover cursor-pointer">contact</h5>
            </div>
        </div>
    )
}

export default Useful