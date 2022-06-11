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

// 受け取るpropsの型定義
type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

export const RegisterModal: React.FC<Props> = (props) => {
    const {open, setOpen} = props;

    // Stateの宣言
    const [paymentCycle, setPaymentCycle] = useState<string>("");

    // 支払いサイクルを選択したら
    const onChangePaymentCycleSelect = (e: SelectChangeEvent) => {
        setPaymentCycle(e.target.value);
    };

    return (
        <>
            <Dialog open={open}>
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
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        id="price"
                        label="料金"
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
                    <Button onClick={() => setOpen(false)}>キャンセル</Button>
                    <Button onClick={() => setOpen(false)}>追加する</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};