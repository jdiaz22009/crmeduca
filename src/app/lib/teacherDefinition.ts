import {z} from 'zod';

export const TeacherFormSchema = z.object({
  fullName: z.string().min(1),
  phone: z.string().min(1),
  numberDocument: z.string().min(1),
});

export type FormState =
  | {
      errors?: {
        fullName?: string[];
        phone?: string[];
        numberDocument?: string[];
      };
      message?: string;
    }
  | undefined;
