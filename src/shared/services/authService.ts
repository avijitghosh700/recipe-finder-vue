import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type Auth,
  type UserCredential,
} from "firebase/auth";
import { useFirebaseAuth } from "vuefire";

import firebaseApp from "../firebase.config";

const Auth: Auth = <Auth>useFirebaseAuth(firebaseApp.name);

export const signIn = (email: string, password: string): Promise<UserCredential> => {
  return signInWithEmailAndPassword(Auth, email, password);
};

export const signUp = (email: string, password: string): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(Auth, email, password);
};

export const logOut = () => signOut(Auth);
