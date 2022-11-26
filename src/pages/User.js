import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Jajal from "./Jajal";

const User = () => {
    return (
        <BrowserRouter>
            <div>User</div>
            <Routes>
                <Route path="jajal" element={<Jajal />} />
            </Routes>
        </BrowserRouter>
    )
}

export default User