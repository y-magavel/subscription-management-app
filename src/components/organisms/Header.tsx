import React from "react";
import {AppBar, Box, Button, styled, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {logOut} from "../../services/api";
import {useRecoilValue} from "recoil";
import {authState} from "../../store/auth";

const CustomToolbar = styled(Toolbar)({
    justifyContent: 'space-between',
}) as typeof Toolbar;

const CustomTitle = styled(Typography)({
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    cursor: 'pointer',
}) as typeof Typography;

export const Header: React.FC = () => {
    const navigate = useNavigate();
    // ログインしていたらtrue、していなければfalse
    const isLogined = useRecoilValue(authState) !== "";

    // ログアウトボタンを押したとき
    const onClickLogout = async () => {
        await logOut();
    };

    return (
        // <>
        <AppBar position="fixed">
            <CustomToolbar>
                <CustomTitle component="a" onClick={() => navigate("/")}>サブスク管理アプリ</CustomTitle>

                <Box>
                    {isLogined ? (
                        // ログインしていたら、こっちを表示する
                        <>
                            <Button variant="outlined" color="inherit" onClick={onClickLogout}>ログアウト</Button>
                        </>
                    ) : (
                        // ログインしていなければ、こっちを表示する
                        <>
                            <Button variant="outlined" color="inherit" onClick={() => navigate("/signup")}>新規登録</Button>
                            <Button variant="outlined" color="inherit" onClick={() => navigate("/login")}>ログイン</Button>
                        </>

                    )}
                </Box>

            </CustomToolbar>
        </AppBar>
        // </>
    );
};