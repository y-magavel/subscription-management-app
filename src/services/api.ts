import {
    createUserWithEmailAndPassword,
    EmailAuthProvider,
    getAuth,
    reauthenticateWithCredential,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut,
    updateEmail,
    updatePassword,
    sendPasswordResetEmail,
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
    where,
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

// メールアドレスを変更する
export const changeEmail = async (newEmail: string, password: string): Promise<boolean> => {
    const auth = getAuth();
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user!.email!, password);

    // メールアドレス変更のために再認証する（Firebaseのルールで決められていて必要なため）
    await reauthenticateWithCredential(user!, credential).then(() => {
        console.log("再認証成功");
    }).catch((error) => {
        console.log(`再認証失敗: ${error}`);
        // TODO: 呼び出し元から失敗の理由（アカウントロックやパスワード間違い）がわかるように修正する
        return false;
    });

    let result: boolean = false; // メールアドレス変更の成功or失敗
    await updateEmail(user!, newEmail).then(() => {
        result = true;
        console.log("メールアドレス変更成功");
    }).catch((error) => {
        // TODO: 呼び出し元から失敗の理由（既に使用されているメールアドレスなど）がわかるように修正する
        result = false;
        console.log(`メールアドレス変更失敗: ${error}`)
    });

    return result;
};

// パスワードを変更する
export const changePassword = async (newPassword: string, password: string) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user!.email!, password);

    // メールアドレス変更のために再認証する（Firebaseのルールで決められていて必要なため）
    await reauthenticateWithCredential(user!, credential).then(() => {
        console.log("再認証成功");
    }).catch((error) => {
        console.log(`再認証失敗: ${error}`);
        // TODO: 呼び出し元から失敗の理由（アカウントロックやパスワード間違い）がわかるように修正する
        return false;
    });

    let result: boolean = false; // パスワード変更の成功or失敗

    await updatePassword(user!, newPassword).then(() => {
        result = true;
        console.log("メールアドレス変更成功");
    }).catch((error) => {
        result = false;
        console.log(`メールアドレス変更失敗: ${error}`);
    });

    return result;
};

// パスワード再設定用メールを送信する
export const submitPasswordResetEmail = async (email: string): Promise<boolean> => {
    const auth = getAuth();
    let result: boolean = false; // パスワード再設定メール送信の成功or失敗

    await sendPasswordResetEmail(auth, email)
        .then(() => {
            result = true;
            console.log("パスワード再設定メール送信成功");
        })
        .catch((error) => {
            result = false;
            console.log(`パスワード再設定メール送信失敗: ${error}`);
        });

    return result;
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