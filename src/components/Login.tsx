import React from "react";
import {Button, Card, CardContent, Container, Stack, TextField, Typography} from "@mui/material";

export const Login: React.FC = () => {
    return (
        <>
            <Container sx={{height: '100vh',display: 'flex', alignItems: 'center'}}>
                <Card sx={{width: '30%', minWidth: 325, maxWidth: 500, margin: 'auto'}}>
                    <CardContent>
                        <Stack spacing={2}>
                            <Typography sx={{textAlign: 'center', fontWeight: 'bold',}}>ログイン</Typography>
                            <TextField required id="outlined-required" label="メールアドレス"/>
                            <TextField required id="outlined-password-input" label="パスワード" type="password"
                                       autoComplete="current-password"/>
                            <Button variant="contained">ログインする</Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
};