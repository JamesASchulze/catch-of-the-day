import Rebase from "re-base";
import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
      apiKey: "AIzaSyAxkofyV8o4xqZz0TZnu99E8MDpTXq5v1E",
      authDomain: "catch-of-the-day-james-s-8ef7f.firebaseapp.com",
      databaseURL: "https://catch-of-the-day-james-s-8ef7f.firebaseio.com",
      // projectId: "catch-of-the-day-james-s-8ef7f",
      // storageBucket: "catch-of-the-day-james-s-8ef7f.appspot.com",
      // messagingSenderId: "1076709643946",
      appId: "1:1076709643946:web:1acf6b9c4f258fe9f462d3",
      // measurementId: "G-HV7HT0BCD5"
});

const base = Rebase.createClass(firebaseApp.database());

// Named export
export { firebaseApp }

// Default export
export default base;