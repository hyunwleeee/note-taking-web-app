import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
} from 'firebase/auth';
import { auth } from './client';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


export const signUp = async (
  email: string,
  password: string,
) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

export const logout = () => {
  return auth.signOut();
}

export const loginWithGithub = async () => {
  const result = await signInWithPopup(auth, githubProvider);
  const credential = GithubAuthProvider.credentialFromResult(result);
  const token = credential?.accessToken;

  return { user: result.user, token };
};

export const loginWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, googleProvider);

  return userCredential.user;
};
