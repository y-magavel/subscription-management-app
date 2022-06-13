import React, {useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select, SelectChangeEvent,
    TextField
} from "@mui/material";
import {Service} from "../../types/service";

// 受け取るpropsの型定義
type Props = {
    open: boolean;
    setDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: Service;
    onClickDeleteService: (id: string) => Promise<void>;
    onClickUpdateService: (id: string, serviceName: string, servicePrice: number, paymentCycle: string) => Promise<void>;
};

export const ServiceDetail: React.FC<Props> = (props) => {
    // Propsの受け取り
    const {open, setDetailOpen, data, onClickDeleteService, onClickUpdateService} = props;

    // Stateの宣言
    const [serviceName, setServiceName] = useState<string>("");
    const [servicePrice, setServicePrice] = useState<number>(0);
    const [paymentCycle, setPaymentCycle] = useState<string>("");

    // サブスクの詳細画面を開いたら
    useEffect(() => {
        setServiceName(data.serviceName);
        setServicePrice(data.servicePrice);
        setPaymentCycle(data.paymentCycle);
    }, [data.serviceName, data.servicePrice, data.paymentCycle]);


    // サービス名を入力したら
    const onChangeServiceName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setServiceName(e.target.value);
    };

    // 料金を入力したら
    const onChangeServicePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setServicePrice(Number(e.target.value));
    };

    // 支払いサイクルを選択したら
    const onChangePaymentCycleSelect = (e: SelectChangeEvent) => {
        setPaymentCycle(e.target.value);
    };

    return (
        <>
            <Dialog open={open} onClose={() => setDetailOpen(false)}>
                <DialogTitle>サブスク名</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="サービス名"
                        value={serviceName}
                        onChange={onChangeServiceName}
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        id="price"
                        label="料金"
                        value={servicePrice}
                        onChange={onChangeServicePrice}
                        type="number"
                        fullWidth
                        variant="outlined"
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="payment-cycle-select-label">支払いサイクル</InputLabel>
                        <Select
                            labelId="payment-cycle-select-label"
                            id="payment-cycle-select"
                            value={paymentCycle}
                            label="支払いサイクル"
                            onChange={onChangePaymentCycleSelect}
                        >
                            <MenuItem value={"月払い"}>月払い</MenuItem>
                            <MenuItem value={"年払い"}>年払い</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" color="error" onClick={() => onClickDeleteService(data.id)}>削除する</Button>
                    <Button  variant="contained" color="primary" onClick={() => onClickUpdateService(data.id, serviceName, servicePrice, paymentCycle)}>更新する</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};