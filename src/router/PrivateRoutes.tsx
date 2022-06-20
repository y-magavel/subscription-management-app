import React from "react";
import {useLocation, Outlet, Navigate} from "react-router-dom";
import {useAuth, getAuthEmail} from "../store/auth";

export const PrivateRoutes: React.FC = () => {
    const location = useLocation();
    console.log(location);
    console.log(`リダイレクト元：${location.pathname}`);

    // ログインしているか
    const isLogined = useAuth();
    // メールアドレスが検証済みか
    const isVerifiedEmail = getAuthEmail();

    // 遷移先を決める
    let target = isLogined ? <Outlet/> : <Navigate to="/login" replace state={{from: location}}/>;


    // TODO: PrivateRoutesの中にあるルート同士でリダイレクトすると無限ループが起きるので、それを防ぐための条件分岐。冗長なのでリファクタリングする。
    // ホームを指定してアクセスしてきた場合はこっち
    if (isLogined && location.pathname.includes("home")) {
        if (isVerifiedEmail) {
            target = <Outlet/>;
        } else {
            target = <Navigate to="/wait-email-verify" replace/>;
        }
    }

    // アカウント設定画面を指定してアクセスしてきた場合はこっち
    if (isLogined && location.pathname.includes("account-settings")) {
        if (isVerifiedEmail) {
            target = <Outlet/>;
        } else {
            target = <Navigate to="/wait-email-verify" replace/>;
        }
    }

    // メール確認待ち画面を直接指定してアクセスしてきた場合はこっち
    if (isLogined && location.pathname.includes("wait-email-verify")) {
        if (isVerifiedEmail) {
            target = <Navigate to="/home" replace/>;
        } else {
            target = <Outlet/>;
        }
    }

    return target;
};