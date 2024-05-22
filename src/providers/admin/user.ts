import {
  auth,
  dbCollection,
} from '@/config/firebase/admin/firebase-admin-config';
import {IUser} from '@/types';

export const addUser = async (payload: IUser): Promise<IUser> => {
  let response: IUser = {
    email: '',
    fullName: '',
  };
  try {
    const authUser = await auth.createUser({
      displayName: payload?.fullName,
      email: payload?.email,
      password: payload.password ?? '',
    });

    if (authUser) {
      response = {
        uuid: authUser?.uid,
        ...payload,
        validatedEmail: authUser?.emailVerified,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await dbCollection.collection('users').doc(authUser?.uid).set(response);
      return response;
    }

    return response;
  } catch (error) {
    throw error;
  }
};
