import {CourseFormSchema} from '@/app/lib/courseDefinition';
import {addCourse} from '@/providers/client/course';

export async function createCourse(
  formData: FormData,
  uuid?: string,
  type?: 'delete' | 'insert' | 'update',
) {
  const validatedFields = CourseFormSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: {course: validatedFields.error.flatten().fieldErrors},
    };
  }
  const {title, description} = validatedFields.data;

  try {
    return await addCourse({title, description}, uuid, type);
  } catch (error) {
    throw error;
  }
}
