import React from "react";
import {Header} from "../organisms/Header";
import {Button, Container, Grid, Typography} from "@mui/material";
import appBlueImage from "../../images/app-blue.png";
import phoneBlueImage from "../../images/phone-blue.png";
import exportBlueImage from "../../images/export-blue.png";
import userBlueImage from "../../images/user-blue.png";

export const Top: React.FC = () => {
    return (
        <>
            <Header/>
            <Container
                sx={{display: 'flex', flexFlow: 'column', alignItems: 'center', paddingY: {xs: '56px', md: '64px'}}}>

                <Grid container spacing={2}>

                    <Grid item xs={12} md={12} sx={{textAlign: "center"}}>
                        <Typography variant="h3" marginTop="50px">
                            サブスクを簡単に見える化しよう
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} sx={{textAlign: "center"}}>
                        <img src={appBlueImage} alt="色々なアプリケーションの画像" width={"60%"}/>
                    </Grid>

                    <Grid item xs={12} md={8} sx={{textAlign: "center"}}>
                        <Typography variant="h3">
                            スマホからでもアプリのように使える
                        </Typography>
                        <Typography variant="caption">
                            ※実装予定
                        </Typography>
                        <Typography variant="body1">
                            PWA（Progressive Web Apps）に対応しているため、ホーム画面にアイコンを追加することができます。
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{textAlign: "center"}}>
                        <img src={phoneBlueImage} alt="スマートフォンの画像" width={"60%"}/>
                    </Grid>

                    <Grid item xs={12} md={8} sx={{textAlign: "center"}}>
                        <Typography variant="h3">
                            CSVファイル対応のエクスポート機能
                        </Typography>
                        <Typography variant="caption">
                            ※実装予定
                        </Typography>
                        <Typography variant="body1">
                            Excelなどで管理したいときに役立つ機能です。
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{textAlign: "center"}}>
                        <img src={exportBlueImage} alt="ダウンロードアイコンの画像" width={"60%"}/>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{textAlign: "center"}}>
                        <Typography variant="h3">
                            今すぐ始める
                        </Typography>
                        <Typography variant="body1">
                            完全無料です。
                        </Typography>
                        <Button variant="contained" href={"/signup"} sx={{marginTop: "50px"}}>
                            新規登録
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{textAlign: "center"}}>
                        <img src={userBlueImage} alt="パソコンを使う女性の画像" width={"60%"}/>
                    </Grid>

                </Grid>

            </Container>
        </>
    );
};