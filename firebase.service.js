// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAFpkNf4F_EnE3iv-2CRtNbLAQLlwIWLEQ",
    authDomain: "testeval-b75ac.firebaseapp.com",
    projectId: "testeval-b75ac",
    storageBucket: "testeval-b75ac.appspot.com",
    messagingSenderId: "429032512885",
    appId: "1:429032512885:web:949a73fc4e9d728153473c",
    measurementId: "G-BT3E3GLGMW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);