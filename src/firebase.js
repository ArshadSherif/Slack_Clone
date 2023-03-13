import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDj7oCIAjd-9I8qZ-g15tzSjMxAQD0imQ8",
  authDomain: "slack-clone-10afc.firebaseapp.com",
  projectId: "slack-clone-10afc",
  storageBucket: "slack-clone-10afc.appspot.com",
  messagingSenderId: "865920099571",
  appId: "1:865920099571:web:93a85b86d92a8823c9c386",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider };
