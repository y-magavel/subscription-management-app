import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {collection, addDoc, serverTimestamp} from "firebase/firestore";
import {db} from "./firebase";


// 新規登録
export const signUp = async (email: string, password: string) => {
    const auth = getAuth();

    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(`登録成功: ${user.uid}`);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`${errorCode}: ${errorMessage}`);
        });
};

// ログイン
export const logIn = async (email: string, password: string) => {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(`ログイン成功: ${user.uid}`);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`${errorCode}: ${errorMessage}`);
        });
};

// ログアウト
export const logOut = async () => {
    const auth = getAuth();
    await signOut(auth).then(() => {
        console.log(`ログアウト成功`);
    }).catch((error) => {
        console.log(`エラー発生: ${error}`);
    });
};

// サブスクを追加する
export const addService = async (serviceName: string, servicePrice: number, paymentCycle: string, uid: string) => {
    try {
        const docRef = await addDoc(collection(db, "services"), {
            service_name: serviceName,
            service_price: servicePrice,
            payment_cycle: paymentCycle,
            user_id: uid,
            created_at: serverTimestamp(),
        });
        console.log(`サブスクを追加しました：${docRef.id}`);
    } catch (e) {
        console.log(`エラー発生: ${e}`);
    }
};