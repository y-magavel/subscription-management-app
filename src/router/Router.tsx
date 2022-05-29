import React from "react";
import {Route, Routes} from "react-router-dom";
import {SignUp} from "../components/pages/SignUp";
import {Login} from "../components/pages/Login";

export const Router: React.FC = () => {
    return (
        <Routes>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    );
};