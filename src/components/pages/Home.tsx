import React, {useCallback, useEffect, useState} from "react";
import {Header} from "../organisms/Header";
import {Container} from "@mui/material";
import {Footer} from "../organisms/Footer";
import {RegisterModal} from "../organisms/RegisterModal";
import {ServiceList} from "../organisms/ServiceList";
import {useAuthWithUid} from "../../store/auth";
import {Service} from "../../types/service";
import {getServiceList} from "../../services/api";

export const Home: React.FC = () => {
    // サブスク登録モーダルの開閉用State
    const [open, setOpen] = useState<boolean>(false); // TODO: カスタムフックにすることを検討する

    const loginUser = useAuthWithUid();
    const [serviceList, setServiceList] = useState<Array<Service>>([]);

    // 一覧データ取得/更新
    const fetch = useCallback(async () => {
        const data = await getServiceList(loginUser);
        setServiceList(data);
    }, [loginUser]);

    // 初回画面表示時
    useEffect( () => {
        (async () => {
            await fetch();
        })();
    }, [fetch]);

    return (
        <>
            <Header/>
            <Container sx={{height: '100vh', display: 'flex', alignItems: 'center'}}>
                <ServiceList data={serviceList}/>
            </Container>
            <RegisterModal open={open} setOpen={setOpen}/>
            <Footer open={open} setOpen={setOpen}/>
        </>
    );
};