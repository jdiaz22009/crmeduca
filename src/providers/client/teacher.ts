import {
  collection,
  fireStore,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from '@/config/firebase/client/firebase-client-config';
import {ICourse, ITeacher, Status} from '@/types';
import {generateUuid} from '@/utils';

export const getAllTeachers = async (): Promise<ITeacher[]> => {
  try {
    let dataTeacher: ITeacher[] = [];
    const course = query(
      collection(fireStore, 'teachers'),
      where('status', '==', 'ACTIVE'),
    );
    const querySnapshot = await getDocs(course);
    querySnapshot.forEach(doc => {
      dataTeacher.push(doc.data() as ITeacher);
    });
    return dataTeacher;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addTeacher = async (
  payload: ITeacher,
  uuid?: string,
  type?: 'delete' | 'insert' | 'update',
) => {
  try {
    const uid = uuid ?? generateUuid();
    await setDoc(doc(fireStore, 'teachers', uid), {
      ...payload,
      uuid: uid,
      status: type !== 'delete' ? Status.ACTIVE : Status.ERASED,
    });
  } catch (error) {
    throw error;
  }
};
