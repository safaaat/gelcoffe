import { React, useState, useEffect } from "react";

function About() {
    const [offsetY, setOffSetY] = useState(0);
    const handleScroll = () => {
        if (window.scrollY > 650 && window.scrollY < 3500) {
            setOffSetY(window.pageYOffset - 1200)
        } else if (window.scrollY > 3500) {
            setOffSetY(2296)
        } else {
            setOffSetY(0)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [offsetY]);
    return (
        <div className="bg-gray-200">
            <div className="w-[90%] mx-auto">
                <div className="">
                    <h2 className="judul-contain">About gel Coffe</h2>
                    <p className="line-judul"></p>
                </div>
                <div className="grid md:grid-cols-2 gap-[2.5rem] md:gap-0 pt-[2rem] items-center">
                    <div className="about-box-img group">
                        <div className="w-full h-auto md:h-[12rem] lg:h-auto overflow-hidden">
                            <img src={process.env.PUBLIC_URL + "/assets/images/home/About-profile.png"} alt="about-profile" className="md:-mt-[20%] lg:-mt-[20%] group-hover:scale-125 transition-all duration-300" />
                        </div>
                        <div className="mx-5 py-5 grid gap-4">
                            <h4 className="text-color-primary capitalize text-[1.5rem] text-center font-semibold">our story</h4>
                            <p className="text-justify text-color-gray">Gel Coffee is an unofficial website, only as a learning medium. this website is made using ReactJs, Tailwind. This website is connected by API's, more precisely fake Api.json, every interaction on the website is not saved, and will return to normal according to Api's data on github, because this project was created not using a database, only using <a href="https://fake-coffe-api.herokuapp.com/" target={'_blank'} rel="noreferrer" className="text-blue-700 hover:text-blue-400 underline">Fake Api's JSON Server</a></p>
                        </div>
                    </div>
                    <div className="overflow-hidden relative">
                        <div className="w-full duration-1000 relative -top-[10rem] 360:-top-[10rem] md:-top-[2rem] " style={{ transform: `translateY(${offsetY * 0.1}px)` }}>
                            <img src={process.env.PUBLIC_URL + "/assets/images/home/About-profile-2.png"} alt="about-profile-2" className=" scale-125" />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default About