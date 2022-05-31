import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";

export const signUp = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            // const user = userCredential.user;
            console.log(userCredential.user);
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            console.log(error.message);
        });
};