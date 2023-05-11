import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

//import { getFirestore } from "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAodO1YXzELU-x4ihIOI90lQZF5wq10SVM",
  authDomain: "colsubsidioapp-38a3b.firebaseapp.com",
  projectId: "colsubsidioapp-38a3b",
  storageBucket: "colsubsidioapp-38a3b.appspot.com",
  messagingSenderId: "642261102236",
  appId: "1:642261102236:web:32927af6facc7a49378759",
  experimentalForceLongPolling: true,
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(firebaseApp, {
  merge: true,
});
export default { db, firebaseApp };
