import React, {useCallback, useEffect, useState} from "react";
import {Header} from "../organisms/Header";
import {Container} from "@mui/material";
import {Footer} from "../organisms/Footer";
import {RegisterModal} from "../organisms/RegisterModal";
import {ServiceList} from "../organisms/ServiceList";
import {useAuthWithUid} from "../../store/auth";
import {Service} from "../../types/service";
import {deleteService, getServiceList, updateService} from "../../services/api";
import {ServiceDetail} from "../organisms/ServiceDetail";

export const Home: React.FC = () => {
    // サブスク登録モーダルの開閉用State
    const [registerOpen, setRegisterOpen] = useState<boolean>(false); // TODO: カスタムフックにすることを検討する
    // サブスク詳細モーダルの開閉用State
    const [detailOpen, setDetailOpen] = useState<boolean>(false);
    const [detailData, setDetailData] = useState<Service>({id: "", serviceName: "", servicePrice: 0, paymentCycle: ""});

    // ログインユーザーのuidを取得
    const loginUser = useAuthWithUid();
    // サブスク一覧用のState
    const [serviceList, setServiceList] = useState<Array<Service>>([]);

    // 一覧データ取得/更新
    const fetch = useCallback(async () => {
        const data = await getServiceList(loginUser);
        setServiceList(data);
    }, [loginUser]);

    // 初回画面表示時
    useEffect(() => {
        (async () => {
            await fetch();
        })();
    }, [fetch]);

    // サブスク詳細情報の表示
    const openServiceDetail = (id: string, serviceName: string, servicePrice: number, paymentCycle: string) => {
        setDetailData({id, serviceName, servicePrice, paymentCycle});
        setDetailOpen(true);
    };

    // サブスク削除ボタンをクリックしたら
    const onClickDeleteService = async (id: string) => {
        await deleteService(id);
        await fetch();
        setDetailOpen(false);
    };

    // サブスク更新ボタンをクリックしたら
    const onClickUpdateService = async (id: string, serviceName: string, servicePrice: number, paymentCycle: string) => {
        await updateService(id, serviceName, servicePrice, paymentCycle);
        await fetch();
        setDetailOpen(false);
    };

    return (
        <>
            <Header/>
            <Container sx={{height: '100vh', display: 'flex', alignItems: 'center'}}>
                <ServiceList data={serviceList} openServiceDetail={openServiceDetail}/>
            </Container>
            <ServiceDetail open={detailOpen} setDetailOpen={setDetailOpen} data={detailData}
                           onClickDeleteService={onClickDeleteService} onClickUpdateService={onClickUpdateService}/>
            <RegisterModal open={registerOpen} setOpen={setRegisterOpen} fetch={fetch}/>
            <Footer open={registerOpen} setOpen={setRegisterOpen}/>
        </>
    );
};