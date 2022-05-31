import React from "react";
import {AppBar, Box, Button, styled, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {logOut} from "../../services/api";

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

    // ログアウトボタンを押したとき
    const onClickLogout = () => {
        logOut();
    };

    return (
        // <>
            <AppBar position="fixed">
                <CustomToolbar>
                    <CustomTitle component="a" onClick={() => navigate("/")}>サブスク管理アプリ</CustomTitle>

                    <Box>
                        <Button variant="outlined" color="inherit" onClick={() => navigate("/signup")}>新規登録</Button>
                        <Button variant="outlined" color="inherit" onClick={() => navigate("/login")}>ログイン</Button>
                        <Button variant="outlined" color="inherit" onClick={onClickLogout}>ログアウト</Button>
                    </Box>

                </CustomToolbar>
            </AppBar>
        // </>
    );
};