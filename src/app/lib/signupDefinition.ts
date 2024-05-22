import {z} from 'zod';

export const SignupFormSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(7),
});

export type FormState =
  | {
      errors?: {
        fullName?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
