import React, {useEffect, useState} from "react";
import {Card, CardContent, Tooltip, Typography} from "@mui/material";
import {Service} from "../../types/service";

// 受け取るpropsの型定義
type Props = {
    data: Array<Service>;
};

export const TotalAmount: React.FC<Props> = (props) => {
    const {data} = props;
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalIndex, setTotalIndex] = useState<number>(0);

    // 統計情報を計算する
    useEffect(() => {
        let tempPrice: number = 0;
        let tempIndex: number = 0;
        data.forEach((service) => {
            if (service.paymentCycle === "月払い") {
                tempPrice += service.servicePrice;
            } else if (service.paymentCycle === "年払い") {
                tempPrice += Math.floor(service.servicePrice / 12); // 小数点以下切り捨て
            }
            tempIndex++;
        });
        setTotalPrice(tempPrice);
        setTotalIndex(tempIndex);
    }, [data]);


    return (
        <>
            <Card sx={{width: {xs: "90%", md: "70%"}, margin: "50px"}}>
                <CardContent sx={{textAlign: "center"}}>
                    <Typography variant="h6" sx={{fontWeight: "bold"}}>
                        統計情報
                    </Typography>
                    <Typography variant="subtitle1">
                        サービス数：{totalIndex}個
                    </Typography>
                    <Tooltip title="年払いのサブスクは12分割された金額で計算されます。※小数点以下切り捨て" >
                        <Typography variant="subtitle1">
                            毎月の合計金額：{totalPrice}円
                        </Typography>
                    </Tooltip>
                </CardContent>
            </Card>
        </>
    );
};