import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyCwh09oBWcrBYRHtMjhEDbw9esfvJo4iBs",
  authDomain: "ecom-543db.firebaseapp.com",
  projectId: "ecom-543db",
  storageBucket: "ecom-543db.appspot.com",
  messagingSenderId: "510039884853",
  appId: "1:510039884853:web:1fab224391bd8a74135d7c",
  measurementId: "G-7FJXT9HSR7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };