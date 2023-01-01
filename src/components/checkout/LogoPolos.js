import React from "react"
import { DiCoffeescript } from "react-icons/di";

const LogoPolos = ({ sizeIcon, sizeText }) => {
    return (
        <>
            <div className="logo-polos">
                <DiCoffeescript className={`${sizeIcon}`} />
                <p className={`${sizeText}`}>gel coffe</p>
            </div>
        </>
    )
}

export default LogoPolos