import React from "react";
import {Header} from "../organisms/Header";
import {Button, Container, Stack, TextField, Typography} from "@mui/material";
import {getUserEmail} from "../../store/auth";

export const AccountSettings: React.FC = () => {
    const userEmail = getUserEmail();

    return (
        <>
            <Header/>
            <Container
                sx={{display: 'flex', flexFlow: 'column', alignItems: 'center', paddingY: {xs: '56px', md: '64px'}}}>
                <Typography variant="h4" sx={{marginTop: "50px"}}>
                    アカウント設定
                </Typography>
                <Stack spacing={2} sx={{width: '30%', minWidth: 325, maxWidth: 500}}>
                    <Typography variant="h5" sx={{marginTop: "30px"}}>
                        メールアドレス
                    </Typography>
                    <TextField label="メールアドレス" value={userEmail}/>
                    <Button disabled>メールアドレスを変更する</Button>

                    <Typography variant="h5" sx={{marginTop: "30px"}}>
                        パスワード
                    </Typography>
                    <TextField required label="現在のパスワード" type="password"
                               autoComplete="current-password"/>
                    <TextField required label="新しいパスワード" type="password"
                               autoComplete="current-password"/>
                    <TextField required label="新しいパスワード（確認用）" type="password"
                               autoComplete="current-password"/>
                    <Button disabled>パスワードを変更する</Button>
                </Stack>
            </Container>
        </>
    );
};