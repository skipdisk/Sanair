import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./fbconfig";
import { setDoc, doc } from "firebase/firestore";
import { db } from "./fbconfig";

const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    //eslint-disable-next-line
    const token = credential.accessToken;

    // The signed-in user info.
    const { uid, displayName, email, photoURL } = result.user;

    //create a user if doesn't exist yet
    const userRef = doc(db, "users", `${uid}`);
    setDoc(
      userRef,
      {
        uid: uid,
        displayName: displayName,
        email: email,
        photoURL: photoURL,
        selectedStations: [],
      },
      { merge: true }
    );

    return result.user;
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async ({ email, password }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async ({ name, email, password }) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const { uid } = result.user;
    const userRef = doc(db, "users", `${uid}`);
    setDoc(userRef, {
      uid: uid,
      displayName: name,
      email: email,
      photoURL: "",
      selectedStations: [],
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    const result = sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!", result);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
