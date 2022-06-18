import React from "react";
import {Route, Routes} from "react-router-dom";
import {SignUp} from "../components/pages/SignUp";
import {Login} from "../components/pages/Login";
import {Top} from "../components/pages/Top";
import {Home} from "../components/pages/Home";
import {Page404} from "../components/pages/Page404";
import {PrivateRoutes} from "./PrivateRoutes";
import {WaitEmailVerify} from "../components/pages/WaitEmailVerify";

export const Router: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Top/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<PrivateRoutes/>}>
                <Route path="home" element={<Home/>}/>
                <Route path="wait-email-verify" element={<WaitEmailVerify/>}/>
            </Route>
            <Route path="/*" element={<Page404/>}/>
        </Routes>
    );
};