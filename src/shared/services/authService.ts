import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type Auth,
  type UserCredential,
  GoogleAuthProvider,
} from "firebase/auth";
import { useFirebaseAuth } from "vuefire";

import firebaseApp from "../firebase.config";

const Auth: Auth = <Auth>useFirebaseAuth(firebaseApp.name);

export const signInWithGoogle = (): Promise<UserCredential> => {
  const googleProvider = new GoogleAuthProvider();
  return signInWithPopup(Auth, googleProvider);
};

export const signIn = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(Auth, email, password);
};

export const signUp = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(Auth, email, password);
};

export const logOut = () => signOut(Auth);
