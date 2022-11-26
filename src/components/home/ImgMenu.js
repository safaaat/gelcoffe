import React from "react";

function ImgMenu({ data }) {
    let dataImg = data[0]
    return (
        <div>
            <div className="parent_img group">
                <div className="absolute -bottom-[2rem] xl:-bottom-[3.5rem] px-4 pb-2 w-full bg-gradient-to-t from-white via-white/100 to-white/70 group-hover:bottom-0 transition-all duration-300 group-hover:to-white/50 group-hover:via-white/80">
                    <h3 className="text-[2.5rem] font-semibold">{dataImg.judul}</h3>
                    <p className="text-lg opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:delay-300">{dataImg.info}</p>
                </div>
                <img src={dataImg.image} alt="pasta" className="w-full" />
            </div>
        </div>
    )
}

export default ImgMenu