import React from "react";
import {Header} from "../organisms/Header";
import {Button, Container, Typography} from "@mui/material";
import page404Blue from "../../images/page404-blue.png";

export const Page404: React.FC = () => {
    return (
        <>
            <Header/>
            <Container sx={{display: 'flex', flexFlow: 'column', alignItems: 'center', paddingY: {xs: '56px', md: '64px'}}}>
                <Typography variant="h2" sx={{marginTop: "100px"}}>
                    404
                </Typography>
                <Typography>
                    ページが見つかりませんでした。
                </Typography>
                <img src={page404Blue} alt="段ボールに隠れている人" width={"60%"}/>
                <Button variant="contained" href="/">トップページに戻る</Button>
            </Container>
        </>
    );
};