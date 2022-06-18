import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
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

// アラートを使用するフック
export const useCustomAlert = () => {
    return useRecoilState(customAlertState);
};

// アラート情報の設定専用フック
export const useSetCustomAlert = () => {
    return useSetRecoilState(customAlertState);
};

// アラート情報の取得専用フック
export const useCustomAlertValue = () => {
    return useRecoilValue(customAlertState);
};