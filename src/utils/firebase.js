import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyArWKP_FlFxbrc06D_0j6RC6x7VYFA7ghs",
    authDomain: "h2h-1st-anniv.firebaseapp.com",
    projectId: "h2h-1st-anniv",
    storageBucket: "h2h-1st-anniv.firebasestorage.app",
    messagingSenderId: "380176008893",
    appId: "1:380176008893:web:25766c89379713a35dd9d4",
    measurementId: "G-8L8QSW86CJ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
