import React, {Dispatch, SetStateAction} from "react";
import {AppBar, Toolbar, Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

// 受け取るpropsの型定義
type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

export const Footer: React.FC<Props> = (props) => {
    const {open, setOpen} = props;

    return (
        <>
            <AppBar position="fixed" sx={{top: 'auto', bottom: 0}}>
                <Toolbar sx={{justifyContent: 'space-between', margin: "auto"}}>
                    <small>Copyright &copy; 2022 Magavel</small>
                </Toolbar>
                <Fab color="secondary" onClick={() => setOpen(!open)} aria-label="add"
                     sx={{position: "fixed", bottom: {xs: 30, md: 40}, right: {xs: "5%", md: "30%"}}}>
                    <AddIcon/>
                </Fab>
            </AppBar>
        </>
    );
};