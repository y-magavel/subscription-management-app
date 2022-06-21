import React, {useState} from "react";
import {Header} from "../organisms/Header";
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {getUserEmail} from "../../store/auth";
import {AlertArea} from "../organisms/AlertArea";
import {useSetCustomAlert} from "../../store/alert";
import {changeEmail} from "../../services/api";

export const AccountSettings: React.FC = () => {
    const userEmail = getUserEmail();
    const [newEmail, setNewEmail] = useState<string>(userEmail!); // メールアドレス用
    const [changeEmailButtonDisabled, setChangeEmailButtonDisabled] = useState<boolean>(true); // メールアドレス変更ボタンの有効/無効化切り替え用
    const [dialogChangeButtonDisabled, setDialogChangeButtonDisabled] = useState<boolean>(true); // 確認モーダルの変更ボタンの有効/無効化切り替え用
    const [password, setPassword] = useState<string>(""); // 確認モーダルで入力するパスワード用
    const [open, setOpen] = useState<boolean>(false); // 確認モーダルの表示/非表示切り替え用

    let pattern: RegExp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/; // メールアドレスの正規表現

    // カスタムアラートの使用
    const setCustomAlert = useSetCustomAlert();

    // メールアドレスが入力されたら
    const onChangeNewEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEmail(e.target.value);
        // メールアドレスの値に変化があり、正しいメールアドレス形式で、空ではなかったら、変更ボタンを有効化
        setChangeEmailButtonDisabled((e.target.value === userEmail) || !pattern.test(e.target.value) || (e.target.value === ""));
    };

    // メールアドレス変更ボタンがクリックされたら
    const onClickChangeEmailButton = async () => {
        setOpen(true);
    };

    // 確認モーダルでパスワードが入力されたら
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setDialogChangeButtonDisabled(e.target.value === ""); // パスワードが入力されたら変更ボタンを有効化
    };

    // 確認モーダルの変更ボタンがクリックされたら
    const onClickChangeButtonFinally = async () => {
        let result = await changeEmail(newEmail, password); // メールアドレスの変更処理
        if (result) {
            setOpen(false);
            setCustomAlert({open: true, message: "メールアドレスの変更に成功しました。", type: "success"});
        } else {
            // TODO: メールアドレス変更の失敗理由に応じてメッセージを出し分ける
            setCustomAlert({
                open: true,
                message: "メールアドレスの変更に失敗しました。　※パスワードに問題がない場合、アカウントがロックされている可能性、または既に使用されているメールアドレスである可能性があります。",
                type: "error"
            });
        }
    };

    return (
        <>
            <Header/>
            <AlertArea/>
            <Container
                sx={{display: 'flex', flexFlow: 'column', alignItems: 'center', paddingY: {xs: '56px', md: '64px'}}}>
                <Typography variant="h4" sx={{marginTop: "50px"}}>
                    アカウント設定
                </Typography>
                <Stack spacing={2} sx={{width: '30%', minWidth: 325, maxWidth: 500}}>
                    <Typography variant="h5" sx={{marginTop: "30px"}}>
                        メールアドレス
                    </Typography>
                    <TextField required label="メールアドレス" value={newEmail} onChange={onChangeNewEmail}/>
                    <Button disabled={changeEmailButtonDisabled}
                            onClick={onClickChangeEmailButton}>メールアドレスを変更する</Button>

                    <Typography variant="h5" sx={{marginTop: "30px"}}>
                        パスワード
                    </Typography>
                    <TextField required label="新しいパスワード" type="password"
                               autoComplete="current-password"/>
                    <TextField required label="新しいパスワード（確認用）" type="password"
                               autoComplete="current-password"/>
                    <Button disabled>パスワードを変更する</Button>
                </Stack>
            </Container>

            {/*確認モーダル*/}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>本当に変更しますか？</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        メールアドレスを変更する場合は、再度メールアドレス認証が必要になります。誤ったメールアドレスを登録した場合、アカウントにアクセス出来なくなる恐れがあります。
                    </DialogContentText>
                    <TextField
                        required
                        fullWidth
                        sx={{marginTop: "30px"}}
                        label="現在のパスワードを入力する"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={onChangePassword}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>キャンセル</Button>
                    <Button onClick={onClickChangeButtonFinally} disabled={dialogChangeButtonDisabled}>変更する</Button>
                </DialogActions>
            </Dialog>

        </>
    );
};