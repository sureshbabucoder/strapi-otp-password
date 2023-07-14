import { initializeApp } from "firebase/app";
import { getAuth,RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLoJhRAW1RZS9p9mjRCT-Si68nNfuPAs0",
  authDomain: "otp-app-f2218.firebaseapp.com",
  projectId: "otp-app-f2218",
  storageBucket: "otp-app-f2218.appspot.com",
  messagingSenderId: "653556682997",
  appId: "1:653556682997:web:3c5faf87c3c63eae9f75bc",
  measurementId: "G-416EZLHMQ7"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
