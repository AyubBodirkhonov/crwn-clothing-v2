import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfvIzrhHlSniwLvj00-gYrpfzCu-IA8vA",
  authDomain: "crwn-clothing-db-ecce8.firebaseapp.com",
  projectId: "crwn-clothing-db-ecce8",
  storageBucket: "crwn-clothing-db-ecce8.appspot.com",
  messagingSenderId: "801514962659",
  appId: "1:801514962659:web:5d4437ee67a0d7cb228fd6",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
      });
    } catch (error) {
        console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};
