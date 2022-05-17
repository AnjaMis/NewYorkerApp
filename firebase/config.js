// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getDatabase, push, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAd6g3IRWTswPjeSBe_XM7HBJBS1e_KooE",
  authDomain: "newyorker-b7d2f.firebaseapp.com",
  databaseURL:
    "https://newyorker-b7d2f-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "newyorker-b7d2f",
  storageBucket: "newyorker-b7d2f.appspot.com",
  messagingSenderId: "949867931504",
  appId: "1:949867931504:web:404a69a5a79a812e7651b5",
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);

//const db = getFirestore(app);
const db = getDatabase(app);
const auth = getAuth(app);

export { auth, db };
