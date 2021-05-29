import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyAqOXOLZrdTFGLq7pqy2Gsecr26ofHci8M",
  authDomain: "datapal-5c5ae.firebaseapp.com",
  databaseURL: "https://datapal-5c5ae-default-rtdb.firebaseio.com",
  projectId: "datapal-5c5ae",
  storageBucket: "datapal-5c5ae.appspot.com",
  messagingSenderId: "596230679458",
  appId: "1:596230679458:web:fb249ab32a2fac9c80a0fb",
  measurementId: "G-T8GND4KDPB"
};

const firebaseDB = firebase.initializeApp(firebaseConfig);
// const analytics = firebase.analytics();
export  default firebaseDB ;