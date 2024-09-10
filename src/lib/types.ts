export interface ObjType {
  name: string;
  role: 'worker' | 'teacher';
  surname: string;
  id?: number | string;
  img: string;
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
