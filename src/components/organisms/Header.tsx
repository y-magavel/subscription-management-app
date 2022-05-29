import React from "react";
import {AppBar, Box, Button, styled, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

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

    return (
        // <>
            <AppBar position="fixed">
                <CustomToolbar>
                    <CustomTitle component="a" onClick={() => navigate("/")}>サブスク管理アプリ</CustomTitle>

                    <Box>
                        <Button variant="outlined" color="inherit" onClick={() => navigate("/signup")}>新規登録</Button>
                    </Box>

                </CustomToolbar>
            </AppBar>
        // </>
    );
};