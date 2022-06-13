import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {collection, addDoc, serverTimestamp, query, where, getDocs, doc, deleteDoc} from "firebase/firestore";
import {db} from "./firebase";
import {Service} from "../types/service";

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
            update_at: serverTimestamp(),
            created_at: serverTimestamp(),
        });
        console.log(`サブスクを追加しました：${docRef.id}`);
    } catch (e) {
        console.log(`エラー発生: ${e}`);
    }
};

// サブスク一覧を取得する
export const getServiceList = async (uid: string) => {
    const q = query(collection(db, "services"), where("user_id", "==", uid));
    const querySnapshot = await getDocs(q);
    let result: Array<Service> = [];

    // 取得したデータをresult配列にオブジェクト形式で詰め込む
    querySnapshot.forEach((doc) => {
        result.push({
            id: doc.id,
            serviceName: doc.data().service_name,
            servicePrice: doc.data().service_price,
            paymentCycle: doc.data().payment_cycle,
        });
    });

    return result;
};

// サブスクを削除する
export const deleteService = async (id: string) => {
    await deleteDoc(doc(db, "services", id));
};