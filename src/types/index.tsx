export interface IApiError {
  status: number;
  message: string;
}

export interface IDropdownSelectOption {
  value: string;
  label: string;
}

export interface IImage {
  _id: string;
  name: string;
  desc: string;
  img: {
    imageUrl: string;
    contentType: string;
  };
}

export interface IUserState {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  profile_picture: string | IImage;
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

export interface ISelectedTodoCategoryState {
  selected_category_id: string | undefined;
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

export interface IProfilePictureUploadDispatchActionData {
  data: FormData;
  onSuccess: (res: any) => void;
  onError: (err: any) => void;
}
