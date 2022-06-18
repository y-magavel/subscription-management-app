import {atom, useRecoilState, useSetRecoilState} from "recoil";
import {AlertColor} from "@mui/material";

type CustomAlert = {
    open: boolean;
    message: string;
    type: AlertColor;
};

// アラートメッセージを保持する
export const customAlertState = atom<CustomAlert>({
    key: "alertState",
    default: {open: false, message: "", type: "info"},
});

// アラートメッセージを使用するフック
export const useCustomAlert = () => {
    return useRecoilState(customAlertState);
};

// アラートメッセージの設定専用フック
export const useSetCustomAlert = () => {
    return useSetRecoilState(customAlertState);
};