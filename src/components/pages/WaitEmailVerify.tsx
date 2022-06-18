import React from "react";
import {Button, Container, Typography} from "@mui/material";
import emailBlueImage from "../../images/email-blue.png";
import {Header} from "../organisms/Header";
import {AlertArea} from "../organisms/AlertArea";
import {getUserEmail} from "../../store/auth";
import {sendVerificationEmail} from "../../services/api";
import {useSetCustomAlert} from "../../store/alert";

export const WaitEmailVerify: React.FC = () => {
    const userEmail = getUserEmail();
    const setCustomAlert = useSetCustomAlert();

    // 確認用メール再送信ボタンをクリックしたら
    const onClickResendEmail = async () => {
        await sendVerificationEmail();
        setCustomAlert({open: true, message: "確認用メールを再送信しました。", type: "success"});
    };

    return (
        <>
            <Header/>
            <AlertArea/>
            <Container sx={{display: 'flex', flexFlow: 'column', alignItems: 'center', paddingY: {xs: '56px', md: '64px'}}}>
                <Typography variant="h2" sx={{marginTop: "100px"}}>
                    メールアドレスの確認待ち
                </Typography>
                <Typography>
                    メールアドレスの確認を行ってください。
                </Typography>
                <img src={emailBlueImage} alt="手紙の画像" width={"60%"}/>
                <Typography variant="subtitle1" sx={{marginBottom: "10px"}}>送信先：{userEmail}</Typography>
                <Button variant="contained" onClick={onClickResendEmail}>確認用メールを再送信する</Button>
            </Container>
        </>
    );
};