// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqHXrjyFDLVXQL75E3aLfpVf5tl59tG2s",
  authDomain: "project-react-b4ff6.firebaseapp.com",
  projectId: "project-react-b4ff6",
  storageBucket: "project-react-b4ff6.appspot.com",
  messagingSenderId: "231776781255",
  appId: "1:231776781255:web:c8a4360c6cbdfbd4618fe2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getFirestore(app)

export { database }