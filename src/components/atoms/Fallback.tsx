import React from "react";
import {Container, CircularProgress} from "@mui/material";

// 読み込み中を表現するコンポーネント
export const Fallback: React.FC = () => {
    return (
        <>
            <Container sx={{height: '100vh', display: 'flex', alignItems: 'center'}}>
                <CircularProgress sx={{margin: 'auto'}}/>
            </Container>
        </>
    );
};