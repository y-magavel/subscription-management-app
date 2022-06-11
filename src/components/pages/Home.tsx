import React, {useState} from "react";
import {Header} from "../organisms/Header";
import {Container} from "@mui/material";
import {Footer} from "../organisms/Footer";
import {RegisterModal} from "../organisms/RegisterModal";
import {ServiceList} from "../organisms/ServiceList";

export const Home: React.FC = () => {
    // サブスク登録モーダルの開閉用State
    const [open, setOpen] = useState<boolean>(false); // TODO: カスタムフックにすることを検討する

    return (
        <>
            <Header/>
            <Container sx={{height: '100vh', display: 'flex', alignItems: 'center'}}>
                サブスク一覧
                <ServiceList/>
            </Container>
            <RegisterModal open={open} setOpen={setOpen}/>
            <Footer open={open} setOpen={setOpen}/>
        </>
    );
};