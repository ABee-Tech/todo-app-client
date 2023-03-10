export interface IDropdownSelectOption {
  value: string;
  label: string;
}

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

// Dispatch Prop
export interface ITodoDispatchActionData {
  data: Partial<ITodoState>;
  onSuccess: (res: any) => void;
  onError: (err: any) => void;
}

export interface ITodoCategoryDispatchActionData {
  data: Partial<ITodoCategoryState>;
  onSuccess: (res: any) => void;
  onError: (err: any) => void;
}

export interface IUserDispatchActionData {
  data: Partial<IUserState>;
  onSuccess: (res: any) => void;
  onError: (err: any) => void;
}
