import React from "react";
import {Route, Routes} from "react-router-dom";
import {SignUp} from "../components/pages/SignUp";
import {Login} from "../components/pages/Login";
import {Top} from "../components/pages/Top";
import {Home} from "../components/pages/Home";

export const Router: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Top/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
        </Routes>
    );
};