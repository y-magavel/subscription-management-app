import React from "react";
import {Button, Card, CardContent, Container, Stack, TextField, Typography} from "@mui/material";
import {Header} from "../organisms/Header";

export const SignUp: React.FC = () => {
    return (
        <>
            <Header/>
            <Container sx={{height: '100vh',display: 'flex', alignItems: 'center'}}>
                <Card sx={{width: '30%', minWidth: 325, maxWidth: 500, margin: 'auto'}}>
                    <CardContent>
                        <Stack spacing={2}>
                            <Typography sx={{textAlign: 'center', fontWeight: 'bold',}}>ユーザー新規登録</Typography>
                            <TextField required id="outlined-required" label="メールアドレス"/>
                            <TextField required id="outlined-password-input" label="パスワード" type="password"
                                       autoComplete="current-password"/>
                            <Button variant="contained">登録する</Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
};