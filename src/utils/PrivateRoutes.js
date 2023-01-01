import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ valueAuth }) => {
    let auth = { "token": valueAuth }
    return (
        auth.token ? <Outlet /> : <Navigate to="/" />
    )
}

export default PrivateRoutes