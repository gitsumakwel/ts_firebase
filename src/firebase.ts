// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
/*const GOOGLE_APPLICATION_CREDENTIALS = process.env.REACT_APP_GOOGLE_APPLICATION_CREDENTIALS;*/
const email = process.env.REACT_APP_EMAIL!;
const password = process.env.REACT_APP_YEK!;
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_D_API_KEY!,
  authDomain: process.env.REACT_APP_D_DOMAIN!,
  projectId: process.env.REACT_APP_D_PROJECT_ID!,
  storageBucket: process.env.REACT_APP_D_STORAGE!,
  messagingSenderId: process.env.REACT_APP_D_MESSENGER_ID!,
  appId: process.env.REACT_APP_D_APP_ID!,
  measurementId: process.env.REACT_APP_D_MEASUREMENT!,
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

//Detect auth state
onAuthStateChanged(auth, user=> {

	if(user !== null) {
		console.log('logged in!');
	} else {
		console.log('No user');
	}
});

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });


export {
  db,
}
