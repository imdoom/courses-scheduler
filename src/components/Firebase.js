import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDSvo8aoqpHCLDqyuyST-qgzr6VSQkqdNI",
    authDomain: "course-scheduler-700b4.firebaseapp.com",
    databaseURL: "https://course-scheduler-700b4.firebaseio.com",
    projectId: "course-scheduler-700b4",
    storageBucket: "course-scheduler-700b4.appspot.com",
    messagingSenderId: "234918259193",
    appId: "1:234918259193:web:d23fced187a43d9a6d3528",
    measurementId: "G-86T66J114D"
};
  
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();
  
const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        signInSuccessWithAuthResult: () => false
    }
};

export {db, uiConfig, firebase};