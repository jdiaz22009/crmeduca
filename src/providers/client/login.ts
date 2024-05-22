import {
  auth,
  signInWithEmailAndPassword,
} from '@/config/firebase/client/firebase-client-config';
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};
