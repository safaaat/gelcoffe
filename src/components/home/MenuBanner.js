import React from "react";
import ImgMenu from "./ImgMenu";
import { Link } from "react-router-dom";

function MenuBanner({ linkProduct }) {
    // Data Pasta
    let pasta = [{
        image: process.env.PUBLIC_URL + "/assets/images/makanan/pasta.png",
        judul: "food",
        info: "Heavy food to accompany your cup of coffee"
    }];
    // Data Wafel
    let wafel = [{
        image: process.env.PUBLIC_URL + "/assets/images/cemilan/wafel.png",
        judul: "Snack",
        info: "Snacks to accompany your cup of coffee"
    }]
    // Data Coffe
    let coffee = [{
        image: process.env.PUBLIC_URL + "/assets/images/coffe/coffe-cappuccino-cream.png",
        judul: "Coffe",
        info: "From traditional espresso-based drinks to the latest coffee blends"
    }]
    // Data Juice
    let juice = [{
        image: process.env.PUBLIC_URL + "/assets/images/juice/juice-banana.png",
        judul: "Juice",
        info: "We provide Juice if you want a choice other than Coffee"
    }]

    return (
        <div className="2xl:w-[84.4rem] mx-auto mb-jarak-componen">
            <div className="mx-auto w-[90%]">
                <div >
                    <h2 className="judul-contain">The Best Menu Choices For You</h2>
                    <p className="line-judul"></p>
                </div>
                <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-[1.5rem] md:gap-[3rem] mt-[3.5rem]">
                    <Link to={"category"} onClick={() => linkProduct("products?category.nama=Makanan")}><ImgMenu data={pasta} /></Link>
                    <Link to={"category"} onClick={() => linkProduct("products?category.nama=Cemilan")}><ImgMenu data={wafel} /></Link>
                    <Link to={"category"} onClick={() => linkProduct("products?category.nama=Coffe")}><ImgMenu data={coffee} /></Link>
                    <Link to={"category"} onClick={() => linkProduct("products?category.nama=Juice")}><ImgMenu data={juice} /></Link>
                </div>
            </div>
        </div>
    )
}

export default MenuBanner