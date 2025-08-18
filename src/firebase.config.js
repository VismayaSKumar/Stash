// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdeyhcYwAD1dNN7FO2Wp5ALActvqazoLk",
  authDomain: "photoboothinvite.firebaseapp.com",
  databaseURL: "https://photoboothinvite-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "photoboothinvite",
  storageBucket: "photoboothinvite.firebasestorage.app",
  messagingSenderId: "471209915349",
  appId: "1:471209915349:web:5bfbbd71896db1d196435c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };