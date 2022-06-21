import React from "react";
import {Header} from "../organisms/Header";
import {AlertArea} from "../organisms/AlertArea";
import {Button, Card, CardContent, Container, Stack, TextField, Typography} from "@mui/material";

export const ForgotPassword: React.FC = () => {
    return (
        <>
            <Header/>
            <AlertArea/>
            <Container sx={{height: '100vh', display: 'flex', alignItems: 'center'}}>
                <Card sx={{width: '30%', minWidth: 325, maxWidth: 500, margin: 'auto'}}>
                    <CardContent>
                        <Stack spacing={2}>
                            <Typography sx={{textAlign: 'center', fontWeight: 'bold',}}>パスワード再設定</Typography>
                            <TextField required id="outlined-required" label="メールアドレス" value={""}
                                       onChange={() => null} error={false} helperText={null}/>
                            <Button variant="contained" onClick={() => null}>再設定メールを送信する</Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
};