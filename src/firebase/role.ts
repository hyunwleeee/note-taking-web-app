import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

const db = getFirestore();

export type Role = 'admin' | 'user';

export const setUserRole = async (uid: string, role: Role) => {
  await setDoc(doc(db, 'users', uid), { role }, { merge: true });
};

export const getUserRole = async (uid: string): Promise<Role | null> => {
  const docRef = doc(db, 'users', uid);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return snap.data()?.role ?? null;
  }
  return null;
};
