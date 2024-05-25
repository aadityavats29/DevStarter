// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

console.log(import.meta.env.FIREBASE_Env);
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_Env,
  authDomain: "blog-by-dhruv.firebaseapp.com",
  projectId: "blog-by-dhruv",
  storageBucket: "blog-by-dhruv.appspot.com",
  messagingSenderId: "668402000577",
  appId: "1:668402000577:web:adb43ac6c4737a3c7dea40",
  measurementId: "G-X8BGJKVZHR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;