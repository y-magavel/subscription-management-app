import React from "react";
import {Card, CardContent, Typography} from "@mui/material";

export const TotalAmount: React.FC = () => {
    return (
        <>
            <Card sx={{width: {xs: "90%", md: "70%"}, margin: "50px"}}>
                <CardContent sx={{textAlign: "center"}}>
                    <Typography>
                        統計情報
                    </Typography>
                    <Typography>
                        サービス数：{"13個"}
                    </Typography>
                    <Typography>
                        合計金額：{"10,000円"}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
};