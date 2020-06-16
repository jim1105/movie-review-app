import firebase from "firebase/app"
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDurAQgLpCOSwCfQMk5x8t--9y59dCqp-8",
    authDomain: "finalproject-66293.firebaseapp.com",
    databaseURL: "https://finalproject-66293.firebaseio.com",
    projectId: "finalproject-66293",
    storageBucket: "finalproject-66293.appspot.com",
    messagingSenderId: "133153878941",
    appId: "1:133153878941:web:123b974e50a523e1667574"
    };

// const firebaseConfig = {
//     apiKey: "AIzaSyDuAUjVipINRUmS1sIl9CCB5ElzSIPWpAw",
//     authDomain: "movie-1c138.firebaseapp.com",
//     databaseURL: "https://movie-1c138.firebaseio.com",
//     projectId: "movie-1c138",
//     storageBucket: "movie-1c138.appspot.com",
//     messagingSenderId: "295949678436",
//     appId: "1:295949678436:web:b9693a184ca4abbf0bec71",
//     measurementId: "G-H2XRZ1NHY8"
//   };


// Initialize firebase (not firestore)
firebase.initializeApp(firebaseConfig);

export default firebase;
