import React from "react";
import {useLocation, Outlet, Navigate} from "react-router-dom";
import {useAuth} from "../store/auth";

export const PrivateRoutes: React.FC = () => {
    const location = useLocation();
    console.log(`リダイレクト元：${location.pathname}`);

    const isLogined = useAuth();
    console.log(`ログインしているか: ${isLogined}`);

    // return isLogined ? <Outlet/> : <Navigate to="/login" replace state={{from: location}}/>;
    return isLogined ? <Outlet/> : <Navigate to="/login" replace/>;
};