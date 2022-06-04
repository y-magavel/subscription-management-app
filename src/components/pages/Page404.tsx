import React from "react";
import {Header} from "../organisms/Header";
import {Container} from "@mui/material";

export const Page404: React.FC = () => {
    return (
        <>
            <Header/>
            <Container sx={{height: '100vh',display: 'flex', alignItems: 'center'}}>
                <p>404 Not Found.</p>
            </Container>
        </>
    );
};