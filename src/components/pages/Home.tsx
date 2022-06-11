import React, {useState} from "react";
import {Header} from "../organisms/Header";
import {Container} from "@mui/material";
import {Footer} from "../organisms/Footer";
import {RegisterModal} from "../organisms/RegisterModal";

export const Home: React.FC = () => {
    // サブスク登録モーダルの開閉用State
    const [open, setOpen] = useState<boolean>(false); // TODO: カスタムフックにすることを検討する

    return (
        <>
            <Header/>d
            <Container sx={{height: '100vh', display: 'flex', alignItems: 'center'}}>
                ホーム
            </Container>
            <RegisterModal open={open} setOpen={setOpen}/>
            <Footer open={open} setOpen={setOpen}/>
        </>
    );
};