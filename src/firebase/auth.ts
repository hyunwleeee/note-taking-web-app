import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  getAdditionalUserInfo,
  type UserCredential,
} from 'firebase/auth';
import { auth } from './client';
import { getUserRole, setUserRole } from './role';
import { withFirebaseErrorHandling } from '@utils/withFirebaseErrorHandling';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


export const signUpUser = (
  email: string,
  password: string,
) => withFirebaseErrorHandling(async () => {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = credential.user.uid;

  await setUserRole(uid, 'user');
  return credential;
});

export const login = (email: string, password: string) =>
  withFirebaseErrorHandling(
    async () => {
      const credential = await signInWithEmailAndPassword(auth, email, password)
      const user = credential.user;

      const role = await getUserRole(user.uid);
      return { user, role };
    });

export const logout = () => {
  return auth.signOut();
}

const handleOAuthLogin = async (result: UserCredential) => {
  const uid = result.user.uid;
  const additionalUserInfo = getAdditionalUserInfo(result);

  if (additionalUserInfo?.isNewUser) {
    await setUserRole(uid, 'user');
    return { user: result.user, role: 'user' };
  }

  const role = await getUserRole(uid);
  return { user: result.user, role };
};

export const loginWithGithub = async () => {
  const result = await signInWithPopup(auth, githubProvider);

  const { user, role } = await handleOAuthLogin(result);

  const credential = GithubAuthProvider.credentialFromResult(result);
  const githubToken = credential?.accessToken;

  return { user, role, githubToken };
};

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);

  const { user, role } = await handleOAuthLogin(result);
  return { user, role };
};

// export const loginWithGithub = async () => {
//   const result = await signInWithPopup(auth, githubProvider);
//   const credential = GithubAuthProvider.credentialFromResult(result);
//   const token = credential?.accessToken;
//
//   return { user: result.user, token };
// };
//
// export const loginWithGoogle = async () => {
//   const userCredential = await signInWithPopup(auth, googleProvider);
//
//   return userCredential.user;
// };
