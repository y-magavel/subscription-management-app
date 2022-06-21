import {useState} from "react";

// TODO: React-Hook-Formに置き換えることを検討する
// ユーザー用バリデーションフック
export const useAuthValidation = () => {
    const [emailError, setEmailError] = useState<boolean>(false);
    const [emailHelperText, setEmailHelperText] = useState<string>("");
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordHelperText, setPasswordHelperText] = useState<string>("");

    // メールアドレスとパスワードをチェックする
    const validateAuth = (email: string, password: string) => {
        let validationFlag: boolean = false; // 入力値がバリデーションに引っかかったかどうかのフラグ
        let pattern: RegExp  = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/; // メールアドレスの正規表現

        // メールアドレスの必須チェック
        if (email === "") {
            validationFlag = true;
            setEmailError(true);
            setEmailHelperText("メールアドレスは必須です。");
        } else if (!pattern.test(email)) {
            // メールアドレスが正しい形式かチェック
            validationFlag = true;
            setEmailError(true);
            setEmailHelperText("正しいメールアドレスを入力してください。");
        } else {
            // 問題なければ
            setEmailError(false);
            setEmailHelperText("");
        }

        // パスワードの必須チェック
        if (password === "") {
            validationFlag = true;
            setPasswordError(true);
            setPasswordHelperText("パスワードは必須です。");
        } else if (password.length < 8) {
            // パスワードが8文字以上かチェック
            validationFlag = true;
            setPasswordError(true);
            setPasswordHelperText("パスワードは8文字以上入力してください。");
        } else {
            // 問題なければ
            setPasswordError(false);
            setPasswordHelperText("");
        }

        return validationFlag;
    };

    return {validateAuth, emailError, emailHelperText, passwordError, passwordHelperText, setEmailError, setPasswordError};
};