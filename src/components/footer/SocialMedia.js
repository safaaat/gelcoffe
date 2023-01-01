import React from "react";
import { ImInstagram, ImFacebook, ImTwitter, ImYoutube } from "react-icons/im";

function SocialMedia() {
    return (
        <div className="flex flex-col mt-[1.5rem] 500:mt-[2rem] md:mt-0 sm:items-end">
            <h3 className="footer_judul">SocialMedia</h3>
            <div className="flex gap-2 mt-[1rem] md:mt-[2.5rem]">
                <div className="footer_social-media">
                    <ImInstagram />
                </div>
                <div className="footer_social-media">
                    <ImFacebook />
                </div>
                <div className="footer_social-media">
                    <ImTwitter />
                </div>
                <div className="footer_social-media">
                    <ImYoutube />
                </div>
            </div>
        </div>
    )
}

export default SocialMedia