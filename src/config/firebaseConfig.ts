// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDMPeWvOzFm3JlmEyzruvXwB73XllZJP9M",
	authDomain: "movieapp-nextjs.firebaseapp.com",
	projectId: "movieapp-nextjs",
	storageBucket: "movieapp-nextjs.appspot.com",
	messagingSenderId: "351784299569",
	appId: "1:351784299569:web:6c55513afefb6140bcb910",
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestoreDB = getFirestore(app);
