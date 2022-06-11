import React, {useCallback, useEffect, useState} from "react";
import {Card, CardActionArea, CardContent, Stack, Typography} from "@mui/material";
import {getServiceList} from "../../services/api";
import {useAuthWithUid} from "../../store/auth";
import {Service} from "../../types/service";

export const ServiceList: React.FC = () => {
    const loginUser = useAuthWithUid();
    const [serviceList, setServiceList] = useState<Array<Service>>([]);

    // 一覧データ取得/更新
    const fetch = useCallback(async () => {
        const data = await getServiceList(loginUser);
        setServiceList(data);
    }, [loginUser]);

    // 初回画面表示時
    useEffect( () => {
        (async () => {
            await fetch();
        })();
    }, [fetch]);

    return (
        <>
            <Stack spacing={2} sx={{width: "100%", alignItems: "center"}}>
                <p>サブスク一覧</p>
                {serviceList.map((service) => {
                    return (
                        <Card key={service.id} sx={{width: "70%"}}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography>{service.serviceName}</Typography>
                                    <Typography>{service.servicePrice}／{service.paymentCycle}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    );
                })}
            </Stack>
        </>
    );
};