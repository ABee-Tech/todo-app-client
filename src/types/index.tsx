export interface IUserInfoState {
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
}
