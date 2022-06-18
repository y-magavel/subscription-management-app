import {
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    serverTimestamp,
    updateDoc,
    where
} from "firebase/firestore";
import {db} from "./firebase";
import {Service} from "../types/service";

// 新規登録
export const signUp = async (email: string, password: string): Promise<boolean> => {
    const auth = getAuth();
    let result: boolean = false; // 新規登録の成功or失敗

    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(`登録成功: ${user.uid}`);
            result = true;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`登録失敗：${errorCode}「${errorMessage}」`);
            result = false;
        });

    return result;
};

// ログイン
export const logIn = async (email: string, password: string): Promise<boolean> => {
    const auth = getAuth();
    let result: boolean = false; // ログインの成功or失敗

    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(`ログイン成功: ${user.uid}`);
            result = true;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`ログイン失敗：${errorCode}「${errorMessage}」`);
            result = false;
        });

    return result;
};

// ログアウト
export const logOut = async (): Promise<boolean> => {
    const auth = getAuth();
    let result: boolean = false; // ログインの成功or失敗

    await signOut(auth).then(() => {
        console.log(`ログアウト成功`);
        result = true;
    }).catch((error) => {
        console.log(`ログアウト失敗: ${error}`);
        result = false;
    });

    return result;
};

// 確認用メールを送信する
export const sendVerificationEmail = async () => {
    const auth = getAuth();

    if (auth.currentUser && !auth.currentUser.emailVerified) {
        // メールアドレスが認証前だったら
        await sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log("確認用メール送信");
            });
    }
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

// サブスクを更新する
export const updateService = async (id: string, serviceName: string, servicePrice: number, paymentCycle: string) => {
    const docRef = doc(db, "services", id);
    await updateDoc(docRef, {
        service_name: serviceName,
        service_price: servicePrice,
        payment_cycle: paymentCycle,
        update_at: serverTimestamp(),
    });
};