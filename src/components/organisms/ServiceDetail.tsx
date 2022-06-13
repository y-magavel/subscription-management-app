import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {Service} from "../../types/service";

// 受け取るpropsの型定義
type Props = {
    open: boolean;
    setDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: Service;
    onClickDeleteService: (id: string) => Promise<void>;
};

export const ServiceDetail: React.FC<Props> = (props) => {
    // Propsの受け取り
    const {open, setDetailOpen, data, onClickDeleteService} = props;

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
                        value={data.serviceName}
                        onChange={() => null}
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        id="price"
                        label="料金"
                        value={data.servicePrice}
                        onChange={() => null}
                        type="number"
                        fullWidth
                        variant="outlined"
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="payment-cycle-select-label">支払いサイクル</InputLabel>
                        <Select
                            labelId="payment-cycle-select-label"
                            id="payment-cycle-select"
                            value={data.paymentCycle}
                            label="支払いサイクル"
                            onChange={() => null}
                        >
                            <MenuItem value={"月払い"}>月払い</MenuItem>
                            <MenuItem value={"年払い"}>年払い</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" color="error" onClick={() => onClickDeleteService(data.id)}>削除する</Button>
                    {/*<Button  variant="contained" color="primary" onClick={() => (null)}>更新する</Button>*/}
                </DialogActions>
            </Dialog>
        </>
    );
};