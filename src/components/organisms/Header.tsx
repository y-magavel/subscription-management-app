import React, {useState} from "react";
import {AppBar, Box, Button, IconButton, Menu, MenuItem, styled, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {logOut} from "../../services/api";
import {useRecoilValue} from "recoil";
import {authState} from "../../store/auth";
import MenuIcon from '@mui/icons-material/Menu';

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
    const isLogined = useRecoilValue(authState) !== ""; // ログインしていたらtrue、していなければfalse

    // ログアウトボタンを押したとき
    const onClickLogout = async () => {
        await logOut();
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
                    <CustomTitle component="a" onClick={() => navigate("/")}>サブスク管理アプリ</CustomTitle>
                    {/*レスポンシブ対応は以下2つのBoxコンポーネントの表示切り替えで対応している*/}

                    {/*---デスクトップ対応---*/}
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        {isLogined ? (
                            // ログインしていたら、こっちを表示する
                            <>
                                <Button variant="outlined" color="inherit" onClick={onClickLogout}>ログアウト</Button>
                            </>
                        ) : (
                            // ログインしていなければ、こっちを表示する
                            <>
                                <Button variant="outlined" color="inherit" onClick={() => navigate("/signup")}
                                        sx={{mr: 1}}>新規登録</Button>
                                <Button variant="outlined" color="inherit"
                                        onClick={() => navigate("/login")}>ログイン</Button>
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