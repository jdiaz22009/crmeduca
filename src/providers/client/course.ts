import {
  collection,
  fireStore,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from '@/config/firebase/client/firebase-client-config';
import {ICourse, Status} from '@/types';
import {generateUuid} from '@/utils';

export const getAllCoruses = async (): Promise<ICourse[]> => {
  try {
    let dataCourse: ICourse[] = [];
    const course = query(
      collection(fireStore, 'course'),
      where('status', '==', 'ACTIVE'),
    );
    const querySnapshot = await getDocs(course);
    querySnapshot.forEach(doc => {
      dataCourse.push(doc.data() as ICourse);
    });
    return dataCourse;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addCourse = async (
  payload: ICourse,
  uuid?: string,
  type?: 'delete' | 'insert' | 'update',
) => {
  try {
    const uid = uuid ?? generateUuid();
    await setDoc(doc(fireStore, 'course', uid), {
      ...payload,
      uuid: uid,
      status: type !== 'delete' ? Status.ACTIVE : Status.ERASED,
    });
  } catch (error) {
    throw error;
  }
};
