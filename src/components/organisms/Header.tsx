import React, {useState} from "react";
import {AppBar, Box, Button, IconButton, Menu, MenuItem, styled, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {logOut} from "../../services/api";
import {useAuth} from "../../store/auth";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {useSetCustomAlert} from "../../store/alert";

// MUIのstyledユーティリティでカスタマイズ
const CustomToolbar = styled(Toolbar)({
    justifyContent: 'space-between',
}) as typeof Toolbar;

const CustomTitle = styled(Typography)({
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    cursor: 'pointer',
}) as typeof Typography;


// Headerコンポーネント本体
export const Header: React.FC = () => {
    const navigate = useNavigate();
    const isLogined = useAuth(); // ログインしていたらtrue、していなければfalse

    const setCustomAlert = useSetCustomAlert();

    // ログアウトボタンを押したとき
    const onClickLogout = async () => {
        let result = await logOut();

        // ログアウトに失敗したら
        if (!result) {
            setCustomAlert({open: true, message: "ログアウトに失敗しました。", type: "error"});
            return;
        }

        setCustomAlert({open: true, message: "ログアウトに成功しました。", type: "success"});
    };

    // タイトルをクリックしたとき
    const onClickTitleNavigate = () => {
        if (isLogined) {
            window.location.href = "/home";
        } else {
            window.location.href = "/";
        }
    };

    // ハンバーガーメニュー開閉用のStateと関数
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const handleOpenNavMenu = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(e.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <>
            <AppBar position="fixed">
                <CustomToolbar>
                    <CustomTitle component="a" onClick={onClickTitleNavigate}>
                        サブスク管理アプリ
                        <Typography variant="caption">Ver.0.1.0 (β版)</Typography>
                    </CustomTitle>
                    {/*レスポンシブ対応は以下2つのBoxコンポーネントの表示切り替えで対応している*/}

                    {/*---デスクトップ対応---*/}
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        {isLogined ? (
                            // ログインしていたら、こっちを表示する
                            <>
                                <Button variant="outlined" color="inherit" href="/home" sx={{mr: 1}}><HomeIcon/>ホーム</Button>
                                <Button variant="outlined" color="inherit" href="/account-settings" sx={{mr: 1}}><ManageAccountsIcon/>アカウント</Button>
                                <Button variant="outlined" color="inherit" onClick={onClickLogout}><LogoutIcon/>ログアウト</Button>
                            </>
                        ) : (
                            // ログインしていなければ、こっちを表示する
                            <>
                                <Button variant="outlined" color="inherit" onClick={() => navigate("/signup")}
                                        sx={{mr: 1}}>新規登録</Button>
                                <Button variant="outlined" color="inherit"
                                        onClick={() => navigate("/login")}><LoginIcon/>ログイン</Button>
                            </>

                        )}
                    </Box>


                    {/*---スマホ対応---*/}
                    {/*TODO: ハンバーガーメニュー部分のコードの可読性が悪いのでリファクタリングする*/}
                    <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {isLogined ? (
                                // ログインしていたら、こっちを表示する
                                <div>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <HomeIcon/>
                                        <Typography textAlign="center" component="a" href="/home"
                                                    sx={{
                                                        textDecoration: 'none',
                                                        color: 'inherit',
                                                    }}>ホーム</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <ManageAccountsIcon/>
                                        <Typography textAlign="center" component="a" href="/account-settings"
                                                    sx={{
                                                        textDecoration: 'none',
                                                        color: 'inherit',
                                                    }}>アカウント</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <LogoutIcon/>
                                        <Typography textAlign="center" component="a" onClick={onClickLogout}
                                                    sx={{
                                                        textDecoration: 'none',
                                                        color: 'inherit',
                                                    }}>ログアウト</Typography>
                                    </MenuItem>
                                </div>
                            ) : (
                                // ログインしていなければ、こっちを表示する
                                <div>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center" component="a" onClick={() => navigate("/signup")}
                                                    sx={{
                                                        textDecoration: 'none',
                                                        color: 'inherit',
                                                    }}>新規登録</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <LoginIcon/>
                                        <Typography textAlign="center" component="a" onClick={() => navigate("/login")}
                                                    sx={{
                                                        textDecoration: 'none',
                                                        color: 'inherit',
                                                    }}>ログイン</Typography>
                                    </MenuItem>
                                </div>
                            )}
                        </Menu>
                    </Box>

                </CustomToolbar>
            </AppBar>
        </>
    );
};