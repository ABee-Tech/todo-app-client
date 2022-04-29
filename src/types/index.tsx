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
  completed: boolean;
  category: any;
  createdBy: string;
  [key: string]: any;
}

export interface ITodoCategoryState {
  _id: string;
  name: string;
  total_count: number;
  completed_count: number;
  color: string;
  createdBy: string;
  isDefault: boolean;
}
