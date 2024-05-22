import * as admin from 'firebase-admin';
import serviceAccount from './service-account.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export const dbCollection = admin.firestore();
export const auth = admin.auth();

export default admin;
