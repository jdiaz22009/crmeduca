export interface IUser {
  fullName: string;
  email: string;
  uuid?: string;
  password?: string | null;
  status?: Status;
  validatedEmail?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICourse {
  title: string;
  description: string;
  uuid?: string;
  status?: string;
}
export interface ITeacher {
  fullName: string;
  phone: string;
  numberDocument: string;
  uuid?: string;
  status?: string;
}

export enum Status {
  ACTIVE = 'ACTIVE',
  ERASED = 'ERASED',
}

export interface IMessageError {
  visible: boolean;
  message: string;
}
