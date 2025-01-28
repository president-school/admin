export interface ObjType {
  photo: string;
  full_name: string;
  role: "Worker" | "Teacher";
  id?: number | string;
  education_level: string;
  isTeacher?: boolean;
  description?: string;
  education?: string;
  scientific_degree?: string;
  admission_days?: string;
  phone?: string;
  email?: string;
  position: string;
  NewDate: number;
}

export interface EmployeesType {
  id?: string;
  uz: ObjType;
  de: ObjType;
  en: ObjType;
  role: string[];
}

export interface IEditEmployee {
  name?: string;
  role?: string;
  surname?: string;
  id?: number | string;
  img?: string;
}

export type Inputs = {
  example: string;
  exampleRequired: string;
};

export type FieldType = {
  email: string;
  password: string;
};

export interface RoutesType {
  id: string;
  path: string;
  component: () => JSX.Element;
}

export interface AddEmployeeFormData {
  admission_days_de: string;
  admission_days_en: string;
  admission_days_uz: string;
  description_de: string;
  description_en: string;
  description_uz: string;
  education_de: string;
  education_en: string;
  education_uz: string;
  education_level_de: string;
  education_level_en: string;
  education_level_uz: string;
  email: string;
  full_name_de: string;
  full_name_en: string;
  full_name_uz: string;
  phone: string;
  position_de: string;
  position_en: string;
  position_uz: string;
  role: string;
  scientific_degree_de: string;
  scientific_degree_en: string;
  scientific_degree_uz: string;
  photo?: string;
}

export type langueType = "de" | "en" | "uz";
export interface AcceptanceType {
  id: string;
  uz: { text: string };
  de: { text: string };
  en: { text: string };
}
export interface AcceptanceModalAction {
  text: any;
  open: boolean;
  refresh: boolean;
}
export type FormModalType = {
  open: boolean;
  role: "add" | "edit";
  id: string;
  refresh: boolean;
  title: string;
};
export interface NewsType extends FormModalType {
  path: string;
}

export interface AddNewType {
  title_uz: string;
  title_de: string;
  title_en: string;
  description_uz: string;
  description_de: string;
  description_en: string;
  photo: string[] | [];
  video: string;
}

export interface NewsData {
  title: string;
  id: string;
  images: string[] | undefined;
  description: string;
  videos: string;
  date: number;
  role: string[];
}

export interface NewsResData {
  id: string;
  en: NewsData;
  de: NewsData;
  uz: NewsData;
}

export interface ObjType {
  photo: string;
  full_name: string;
  role: "Worker" | "Teacher";
  id?: number | string;
  imgURL: string;
  isTeacher?: boolean;
  description?: string;
  education?: string;
  scientific_degree?: string;
  admission_days?: string;
  // phone?: any | undefined;
  email?: string;
  position: string;
  number: string;
}

export interface IEditEmployee {
  name?: string;
  role?: string;
  surname?: string;
  id?: number | string;
  img?: string;
}

export interface UserData {
  email: string;
  role: string;
}
