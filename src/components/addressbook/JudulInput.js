import React from "react"

const JudulInput = ({ active, judul, inputLength }) => {
    if (inputLength === 0) return <h1 className={!active ? "judul-input" : "judul-input_warning"}>{judul}</h1>
    return <h1 className={!active ? "judul-input_length" : "judul-input_length-warning"}>{judul}</h1>
}

export default JudulInput