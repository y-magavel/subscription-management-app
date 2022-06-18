import React, {useEffect, useState} from "react";
import {Card, CardActionArea, CardContent, Pagination, Stack, Typography} from "@mui/material";
import {Service} from "../../types/service";

// 受け取るpropsの型定義
type Props = {
    data: Array<Service>;
    openServiceDetail: (id: string, serviceName: string, servicePrice: number, paymentCycle: string) => void;
};

export const ServiceList: React.FC<Props> = (props) => {
    // Propsの受け取り
    const {data, openServiceDetail} = props;

    // Stateの宣言
    const [page, setPage] = useState<number>(1);
    const [displayData, setDisplayData] = useState<Array<Service>>([]);

    // 1ページあたりのサブスク表示上限
    const displayLimit: number = 10;

    // ページ毎に表示するサブスクを詰め替える
    useEffect(() => {
        let selectedData: Array<Service> = [];
        data.forEach((service, index) => {
            if ((index >= ((page - 1) * displayLimit)) && (index < (page * displayLimit))) {
                selectedData.push(service);
            }
        });
        setDisplayData(selectedData);
    }, [page, data]);

    // ページネーションでページを切り替えたら
    const onChangePagination = (e: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <>
            <Stack spacing={2} sx={{width: "100%", alignItems: "center"}}>
                <Typography variant="h6" sx={{fontWeight: "bold"}}>サブスク一覧</Typography>
                {displayData.map((service) => {
                    return (
                        <Card key={service.id} sx={{width: {xs: "90%", md: "70%"}}}>
                            <CardActionArea
                                onClick={() => openServiceDetail(service.id, service.serviceName, service.servicePrice, service.paymentCycle)}>
                                <CardContent>
                                    <Typography>{service.serviceName}</Typography>
                                    <Typography>{service.servicePrice}円／{service.paymentCycle}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    );
                })}
                <Pagination count={Math.ceil(data.length / displayLimit)} color="primary" page={page} onChange={onChangePagination} sx={{paddingBottom: '100px'}} />
            </Stack>
        </>
    );
};