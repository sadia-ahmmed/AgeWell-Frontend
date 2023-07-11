// My personal firebase testing part

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// import { getFirestore } from "firebase/firestore";
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDs8st4AV9yO_KgsyKuVoQUQcpA8PE2Un4",
//   authDomain: "medicine-tracker-cc589.firebaseapp.com",
//   projectId: "medicine-tracker-cc589",
//   storageBucket: "medicine-tracker-cc589.appspot.com",
//   messagingSenderId: "770788390540",
//   appId: "1:770788390540:web:c9f7fb85e079dc65202da9"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);



// Agewell firebase configuration

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBHuq-bZY64wRri_YKj3r2fq7u-OpI98NM",
    authDomain: "agewell-a4d38.firebaseapp.com",
    projectId: "agewell-a4d38",
    storageBucket: "agewell-a4d38.appspot.com",
    messagingSenderId: "306076916672",
    appId: "1:306076916672:web:39e1871accd75eda998625"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);