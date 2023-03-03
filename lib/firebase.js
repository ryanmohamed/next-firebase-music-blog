//bc of firebase v9 we use /compat/ to avoid undefined apps

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGESENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
};

//prevents error caused by development
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

//export some things we'll need to use
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();