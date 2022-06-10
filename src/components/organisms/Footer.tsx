import React from "react";
import {AppBar, Toolbar, Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export const Footer: React.FC = () => {
    return (
        <>
            <AppBar position="fixed" sx={{top: 'auto', bottom: 0}}>
                <Toolbar sx={{justifyContent: 'space-between', margin: "auto"}}>
                    <small>Copyright &copy; 2022 Magavel</small>
                </Toolbar>
                <Fab color="secondary" aria-label="add"
                     sx={{position: "fixed", bottom: {xs: 30, md: 40}, right: {xs: "5%", md: "30%"}}}>
                    <AddIcon/>
                </Fab>
            </AppBar>
        </>
    );
};