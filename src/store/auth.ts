import {atom} from "recoil";
import {getAuth, onAuthStateChanged} from "firebase/auth";

console.log('store');
const auth = getAuth();

// ログイン中のユーザーのuidを保持する
export const authState = atom({
    key: "authState",
    default: "",
    effects: [
        ({setSelf}) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log(user.uid);
                    setSelf(user.uid);
                }
            });
        },
    ],
});