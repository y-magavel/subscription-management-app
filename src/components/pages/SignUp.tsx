import React, {useEffect, useState} from "react";
import {Button, Card, CardContent, Container, Stack, TextField, Typography} from "@mui/material";
import {Header} from "../organisms/Header";
import {signUp} from "../../services/api";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../store/auth";
import {useAuthValidation} from "../../hooks/useAuthValidation";
import {AlertArea} from "../organisms/AlertArea";
import {useSetCustomAlert} from "../../store/alert";

export const SignUp: React.FC = () => {

    // ログイン状態によってルーティング制御
    const navigate = useNavigate();
    const isLogined = useAuth();
    useEffect(() => {
        // 新規登録後、ホームに遷移する
        let from: any = {from: {pathname: "/home"}}; // TODO: any型の指定をやめる
        if (isLogined) navigate(from.from.pathname, {replace: true});
    }, [isLogined, navigate]);

    // バリデーションのカスタムフック
    const {validateAuth, emailError, emailHelperText, passwordError, passwordHelperText, setEmailError, setPasswordError} = useAuthValidation();

    // カスタムアラートのフック
    const setCustomAlert = useSetCustomAlert();

    // Stateの宣言
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

    // 登録ボタンを押したとき
    const onClickSignUp = async (email: string, password: string) => {
        // バリデーションに引っかかったら
        if (validateAuth(email, password)) return;

        let result = await signUp(email, password);

        // 新規登録に失敗したら
        if (!result) {
            setCustomAlert({open: true, message: "新規登録に失敗しました。", type: "error"});
            setEmailError(true);
            setPasswordError(true);
            return;
        }

        setEmail("");
        setPassword("");
    };

    return (
        <>
            <Header/>
            <AlertArea/>
            <Container sx={{height: '100vh', display: 'flex', alignItems: 'center'}}>
                <Card sx={{width: '30%', minWidth: 325, maxWidth: 500, margin: 'auto'}}>
                    <CardContent>
                        <Stack spacing={2}>
                            <Typography sx={{textAlign: 'center', fontWeight: 'bold',}}>ユーザー新規登録</Typography>
                            <TextField required id="outlined-required" label="メールアドレス" value={email}
                                       onChange={onChangeEmail} error={emailError} helperText={emailHelperText}/>
                            <TextField required id="outlined-password-input" label="パスワード" type="password"
                                       autoComplete="current-password" value={password} onChange={onChangePassword}
                                       error={passwordError} helperText={passwordHelperText}/>
                            <Button variant="contained" onClick={() => onClickSignUp(email, password)}>登録する</Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
};