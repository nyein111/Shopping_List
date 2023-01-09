// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAVXwGi3ucOHgrbTDJwLHFZvf5NA1-L698",
    authDomain: "shopping-app-yt-7bb33.firebaseapp.com",
    projectId: "shopping-app-yt-7bb33",
    storageBucket: "shopping-app-yt-7bb33.appspot.com",
    messagingSenderId: "957782844890",
    appId: "1:957782844890:web:f70b24a52170cfe7b14ce3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc }