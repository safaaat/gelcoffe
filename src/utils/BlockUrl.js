import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const BlockUrl = ({ value, url }) => {
    return (
        value === false ? <Navigate to={`${url}`} /> : <Outlet />
    )
}

export default BlockUrl