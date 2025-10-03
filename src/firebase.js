import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

const firebaseConfig = {
    apiKey: "AIzaSyCy0pJEmPfHpbNM8y3eKMsk7THjdxDO5xE",
    authDomain: "aichatbot-project-5de7a.firebaseapp.com",
    projectId: "aichatbot-project-5de7a",
    storageBucket: "aichatbot-project-5de7a.firebasestorage.app",
    messagingSenderId: "422314453178",
    appId: "1:422314453178:web:a1ab4f8a894e952eedfa83",
    measurementId: "G-9FSPW44JX5",
    databaseURL: "https://aichatbot-project-5de7a-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, analytics, auth, db };
