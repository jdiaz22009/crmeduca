import {z} from 'zod';

export const CourseFormSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export type FormState =
  | {
      errors?: {
        title?: string[];
        description?: string[];
      };
      message?: string;
    }
  | undefined;
