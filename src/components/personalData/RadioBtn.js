import React from "react";

const RadioBtn = ({ text, value, icon, name, checked, addGender }) => {
    const vaCheck = () => {
        if (checked === value) return "checked";
        return "";
    }

    return (
        <>
            <div className="parent_radio-btn">
                <input type="radio" value={value} name={name} checked={vaCheck()} onChange={(input) => addGender(input.target.value)} />

                <div className="parent_icon" onClick={() => addGender(value)}>
                    <span className="icon">{icon}</span>
                    <p>{text}</p>
                </div>
            </div>
        </>
    )
}

export default RadioBtn