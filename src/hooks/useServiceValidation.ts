import {useState} from "react";

// TODO: React-Hook-Formに置き換えることを検討する
// サブスク用バリデーションフック
export const useServiceValidation = () => {

    // バリデーションメッセージ用のState宣言
    const [serviceNameError, setServiceNameError] = useState<boolean>(false);
    const [servicePriceError, setServicePriceError] = useState<boolean>(false);
    const [paymentCycleError, setPaymentCycleError] = useState<boolean>(false);
    const [serviceNameHelperText, setServiceNameHelperText] = useState<string>("");
    const [servicePriceHelperText, setServicePriceHelperText] = useState<string>("");
    const [paymentCycleHelperText, setPaymentCycleHelperText] = useState<string>("");

    // バリエーションチェックを行う
    const validateService = (serviceName: string, servicePrice: number, paymentCycle: string): boolean => {
        let validationFlag: boolean = false; // 入力値がバリデーションに引っかかったかどうかのフラグ

        // サービス名の必須チェック
        if (serviceName === "") {
            validationFlag = true;
            setServiceNameError(true);
            setServiceNameHelperText("サービス名は必須です。");
        } else {
            setServiceNameError(false);
            setServiceNameHelperText("");
        }

        // 料金の必須チェック
        if (servicePrice <= 0) {
            validationFlag = true;
            setServicePriceError(true);
            setServicePriceHelperText("料金は必須です。");
        } else {
            setServicePriceError(false);
            setServicePriceHelperText("");
        }

        // 支払いサイクルの必須チェック
        if (paymentCycle === "") {
            validationFlag = true;
            setPaymentCycleError(true);
            setPaymentCycleHelperText("支払いサイクルは必須です。");
        } else {
            setPaymentCycleError(false);
            setPaymentCycleHelperText("");
        }

        return validationFlag;
    };

    // バリデーションエラーをリセットする
    const validateServiceReset = () => {
        setServiceNameError(false);
        setServiceNameHelperText("");
        setServicePriceError(false);
        setServicePriceHelperText("");
        setPaymentCycleError(false);
        setPaymentCycleHelperText("");
    };

    return {
        validateService,
        validateServiceReset,
        serviceNameError,
        servicePriceError,
        paymentCycleError,
        serviceNameHelperText,
        servicePriceHelperText,
        paymentCycleHelperText
    };
};