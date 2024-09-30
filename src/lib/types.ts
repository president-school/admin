export interface ObjType {
  photo: any;
  full_name: string;
  role: 'worker' | 'teacher';
  id?: number | string;
  imgURL: string;
  isTeacher?: boolean;
  description?: string;
  education?: string;
  scientific_degree?: string;
  admission_days?: string;
  phone?: string | RegExp;
  email?: string;
  position:string
  
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
  login: string;
  password: string;
};