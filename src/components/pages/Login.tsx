import React, {useState} from "react";
import {Button, Card, CardContent, Container, Stack, TextField, Typography} from "@mui/material";
import {Header} from "../organisms/Header";
import {logIn} from "../../services/api";

export const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // メールアドレスを入力したとき
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    // パスワードを入力したとき
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    // ログインボタンを押したとき
    const onClickLogin = async (email: string, password: string) => {
        console.log(email);
        console.log(password);
        await logIn(email, password);
        setEmail("");
        setPassword("");
    };

    return (
        <>
            <Header/>
            <Container sx={{height: '100vh', display: 'flex', alignItems: 'center'}}>
                <Card sx={{width: '30%', minWidth: 325, maxWidth: 500, margin: 'auto'}}>
                    <CardContent>
                        <Stack spacing={2}>
                            <Typography sx={{textAlign: 'center', fontWeight: 'bold',}}>ログイン</Typography>
                            <TextField required id="outlined-required" label="メールアドレス" value={email}
                                       onChange={onChangeEmail}/>
                            <TextField required id="outlined-password-input" label="パスワード" type="password"
                                       autoComplete="current-password" value={password} onChange={onChangePassword}/>
                            <Button variant="contained" onClick={() => onClickLogin(email, password)}>ログインする</Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
};