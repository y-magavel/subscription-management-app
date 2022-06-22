import React, {useState} from "react";
import {Header} from "../organisms/Header";
import {AlertArea} from "../organisms/AlertArea";
import {Button, Card, CardContent, Container, Stack, TextField, Typography} from "@mui/material";
import {useSetCustomAlert} from "../../store/alert";
import {submitPasswordResetEmail} from "../../services/api";

export const ForgotPassword: React.FC = () => {

    const [email, setEmail] = useState<string>("");
    const [sendEmailButtonDisabled, setSendEmailButtonDisabled] = useState<boolean>(true); // 送信ボタンの有効/無効化切り替え用
    let pattern: RegExp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/; // メールアドレスの正規表現

    const setCustomAlert = useSetCustomAlert();

    // メールアドレスが入力されたら
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setSendEmailButtonDisabled(!pattern.test(e.target.value)); // 正しい形式のメールアドレスが入力されたら送信ボタンを有効化
    };

    // 再設定メール送信ボタンがクリックされたら
    const onClickSendEmailButton = async () => {
        let result = await submitPasswordResetEmail(email);
        if (result) {
            setCustomAlert({open: true, message: `宛先：${email}にパスワード再設定メールを送信しました。`, type: "success"});
            setEmail("");
            setSendEmailButtonDisabled(true);
        } else {
            setCustomAlert({open: true, message: `パスワード再設定メールの送信に失敗しました。`, type: "error"});
        }
    };

    return (
        <>
            <Header/>
            <AlertArea/>
            <Container sx={{height: '100vh', display: 'flex', alignItems: 'center'}}>
                <Card sx={{width: '30%', minWidth: 325, maxWidth: 500, margin: 'auto'}}>
                    <CardContent>
                        <Stack spacing={2}>
                            <Typography sx={{textAlign: 'center', fontWeight: 'bold',}}>パスワード再設定</Typography>
                            <TextField required id="outlined-required" label="メールアドレス" value={email}
                                       onChange={onChangeEmail}/>
                            <Button variant="contained" onClick={onClickSendEmailButton}
                                    disabled={sendEmailButtonDisabled}>再設定メールを送信する</Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
};