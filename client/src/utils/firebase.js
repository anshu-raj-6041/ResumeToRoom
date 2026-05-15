import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "resumetoroom.firebaseapp.com",
    projectId: "resumetoroom",
    storageBucket: "resumetoroom.firebasestorage.app",
    messagingSenderId: "736887464767",
    appId: "1:736887464767:web:8bc8fe8d1caad0f73de98a"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export { auth, provider }