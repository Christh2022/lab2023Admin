// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUBK3JyabUctYqzxr2-0wBNMDvH08Tvs8",
  authDomain: "lab2023-2acb9.firebaseapp.com",
  projectId: "lab2023-2acb9",
  storageBucket: "lab2023-2acb9.appspot.com",
  messagingSenderId: "810018998182",
  appId: "1:810018998182:web:2ffd6686c022abeaf07167",
  measurementId: "G-PV7TM6NG13"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app)


