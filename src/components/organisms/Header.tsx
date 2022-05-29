import React from "react";
import {AppBar, Box, Button, styled, Toolbar, Typography} from "@mui/material";

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
    return (
        // <>
            <AppBar position="fixed">
                <CustomToolbar>
                    <CustomTitle component="a">サブスク管理アプリ</CustomTitle>

                    <Box>
                        <Button variant="outlined" color="inherit">ログイン</Button>
                    </Box>

                </CustomToolbar>
            </AppBar>
        // </>
    );
};