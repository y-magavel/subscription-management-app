import {atom, useRecoilValue} from "recoil";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const auth = getAuth();

// ログイン中のユーザーのuidを保持する
export const authState = atom<string | null>({
    key: "authState",
    default: null,
    effects: [
        ({setSelf}) => {
            // 最初の認証状態を取得した時に解決するPromiseを初期値に設定
            let resolvePromise: (value: string | null) => void;
            const initialValue = new Promise<string | null>((resolve) => {
                resolvePromise = resolve;
            });
            setSelf(initialValue);

            // 認証状態の監視
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    resolvePromise(user.uid);
                    setSelf(user.uid);
                } else {
                    resolvePromise(null);
                    setSelf(null);
                }
            });

            // 監視を終了する関数を返す
            return () => {
                unsubscribe();
            };
        },
    ],
});

// ユーザー認証を確認するフック
export const useAuth = () => {
    return useRecoilValue(authState) !== null;
};