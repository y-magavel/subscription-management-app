import React from "react";
import {Card, CardActionArea, CardContent, Stack, Typography} from "@mui/material";

export const ServiceList: React.FC = () => {
    return (
        <>
            <Stack spacing={2} sx={{width: "100%", alignItems: "center"}}>
                <p>サブスク一覧</p>
                <Card sx={{width: "70%"}}>
                    <CardActionArea>
                        <CardContent>
                            <Typography>Netflix</Typography>
                            <Typography>1490円／月</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{width: "70%"}}>
                    <CardActionArea>
                        <CardContent>
                            <Typography>Apple Music</Typography>
                            <Typography>1490円／月</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{width: "70%"}}>
                    <CardActionArea>
                        <CardContent>
                            <Typography>Hulu</Typography>
                            <Typography>1490円／月</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Stack>
        </>
    );
};