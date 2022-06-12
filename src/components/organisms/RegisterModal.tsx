import React, {Dispatch, SetStateAction, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    SelectChangeEvent,
} from "@mui/material";
import {addService} from "../../services/api";
import {useAuthWithUid} from "../../store/auth";

// 受け取るpropsの型定義
type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    fetch: () => Promise<void>;
};

export const RegisterModal: React.FC<Props> = (props) => {
    // Propsの受け取り
    const {open, setOpen, fetch} = props;

    // Stateの宣言
    const [serviceName, setServiceName] = useState<string>("");
    const [servicePrice, setServicePrice] = useState<number>(0); // TODO: 初期値に0があると入力しにくい（コンソールエラー回避のため設定している）
    const [paymentCycle, setPaymentCycle] = useState<string>("");

    // ログインユーザーのuidを取得
    const loginUserId = useAuthWithUid();

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

    // サブスク登録モーダルの入力値をクリアする
    const clearForm = () => {
        setServiceName("");
        setServicePrice(0);
        setPaymentCycle("");
    };

    // キャンセルボタンをクリックしたら ※キャンセルボタンではなくonClose（モーダル範囲外をクリック）でモーダルを閉じた場合は入力値を保持する
    const onClickCancel = () => {
        setOpen(false);
        clearForm();
    };

    // 追加ボタンをクリックしたら
    const onClickAddService = async () => {
        await addService(serviceName, servicePrice, paymentCycle, loginUserId);
        await fetch();
        setOpen(false);
        clearForm();
    };

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>サブスクを追加</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        サービスの情報を入力して追加してください。
                    </DialogContentText>
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
                    <Button onClick={onClickCancel}>キャンセル</Button>
                    <Button onClick={onClickAddService}>追加する</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};