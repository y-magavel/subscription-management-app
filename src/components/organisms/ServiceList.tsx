import React from "react";
import {Card, CardActionArea, CardContent, Stack, Typography} from "@mui/material";
import {Service} from "../../types/service";

// 受け取るpropsの型定義
type Props = {
    data: Array<Service>;
};

export const ServiceList: React.FC<Props> = (props) => {
    // Propsの受け取り
    const {data} = props;

    return (
        <>
            <Stack spacing={2} sx={{width: "100%", alignItems: "center"}}>
                <p>サブスク一覧</p>
                {data.map((service) => {
                    return (
                        <Card key={service.id} sx={{width: {xs: "90%", md: "70%"}}}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography>{service.serviceName}</Typography>
                                    <Typography>{service.servicePrice}円／{service.paymentCycle}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    );
                })}
            </Stack>
        </>
    );
};