export interface IUserState {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface ITodoState {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdBy: string;
}

export interface ITodoCategoryState {
  _id: string;
  name: string;
  progress: number;
  color: string;
  createdBy: string;
}
