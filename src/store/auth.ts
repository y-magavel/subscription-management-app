import {atom} from "recoil";
import {getAuth, onAuthStateChanged} from "firebase/auth";

// ログイン中のユーザーのuidを保持する
export const authState = atom({
    key: "authState",
    default: "",
    effects: [
        ({setSelf}) => {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log(user.uid);
                    setSelf(user.uid);
                } else {
                    setSelf("");
                }
            });
        },
    ],
});