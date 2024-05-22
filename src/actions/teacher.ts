import {TeacherFormSchema} from '@/app/lib/teacherDefinition';
import {addTeacher} from '@/providers/client/teacher';

export async function createTeacher(
  formData: FormData,
  uuid?: string,
  type?: 'delete' | 'insert' | 'update',
) {
  const validatedFields = TeacherFormSchema.safeParse({
    fullName: formData.get('fullName'),
    phone: formData.get('phone'),
    numberDocument: formData.get('numberDocument'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: {teacher: validatedFields.error.flatten().fieldErrors},
    };
  }
  const {fullName, phone, numberDocument} = validatedFields.data;

  try {
    return await addTeacher({fullName, phone, numberDocument}, uuid, type);
  } catch (error) {
    throw error;
  }
}
