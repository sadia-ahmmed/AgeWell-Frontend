// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDs8st4AV9yO_KgsyKuVoQUQcpA8PE2Un4",
  authDomain: "medicine-tracker-cc589.firebaseapp.com",
  projectId: "medicine-tracker-cc589",
  storageBucket: "medicine-tracker-cc589.appspot.com",
  messagingSenderId: "770788390540",
  appId: "1:770788390540:web:c9f7fb85e079dc65202da9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);