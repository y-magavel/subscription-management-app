import React from "react";
import {Header} from "../organisms/Header";
import {Container} from "@mui/material";

export const Home: React.FC = () => {
    return (
        <>
            <Header/>
            <Container sx={{height: '100vh',display: 'flex', alignItems: 'center'}}>
                ホーム
            </Container>
        </>
    );
};