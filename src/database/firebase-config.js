import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDUt6RGF02D8KRuT58RI6526D8-FTLJ5l0",
  authDomain: "journal-app-7a4fe.firebaseapp.com",
  projectId: "journal-app-7a4fe",
  storageBucket: "journal-app-7a4fe.appspot.com",
  messagingSenderId: "743935371441",
  appId: "1:743935371441:web:1e8f7989d133041a235a90"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  db,
  firebase,
  googleAuthProvider
}
