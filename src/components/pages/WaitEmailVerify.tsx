import React from "react";
import {Button, Container, Typography} from "@mui/material";
import emailBlueImage from "../../images/email-blue.png";
import {Header} from "../organisms/Header";

export const WaitEmailVerify: React.FC = () => {
    return (
        <>
            <Header/>
            <Container sx={{display: 'flex', flexFlow: 'column', alignItems: 'center', paddingY: {xs: '56px', md: '64px'}}}>
                <Typography variant="h2" sx={{marginTop: "100px"}}>
                    メールアドレスの確認待ち
                </Typography>
                <Typography>
                    メールアドレスの確認を行ってください。
                </Typography>
                <img src={emailBlueImage} alt="手紙の画像" width={"60%"}/>
                <Button variant="contained">確認用メールを再送信する</Button>
            </Container>
        </>
    );
};