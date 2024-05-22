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
  uuid?: string;
  status?: string;
  title: string;
  description: string;
}

export enum Status {
  ACTIVE = 'ACTIVE',
  ERASED = 'ERASED',
}

export interface IMessageError {
  visible: boolean;
  message: string;
}
