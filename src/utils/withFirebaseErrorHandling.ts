import { mapFirebaseError } from "@type/errors/firebase-error";
import { FirebaseError } from "firebase/app";

export const withFirebaseErrorHandling = async <T>(
  callback: () => Promise<T>
): Promise<T> => {
  try {
    return await callback();
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw mapFirebaseError(error.code);
    }
    throw error;
  }
};
