import firebase from "firebase/compat/app";
import "firebase/compat/auth";


const firebaseConfig = {
    apiKey: "AIzaSyC20L2d4mtYKUUxFf16zkKDz7BUh8RD8To",
    authDomain: "class-schedule-8d945.firebaseapp.com",
    projectId: "class-schedule-8d945",
    storageBucket: "class-schedule-8d945.appspot.com",
    messagingSenderId: "106829612284",
    appId: "1:106829612284:web:47d64888c69dff7a0fc379"
  };

firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
export {projectAuth};