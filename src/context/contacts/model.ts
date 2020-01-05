export interface Skill {
  _id: number;
  name: string;
}

export interface Contact {
  _id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  department: string;
  dateAdded: Date;
  skills: Skill[];
}

export interface Action {
  type: string;
  payload?: any;
}

export interface State {
  contacts: Contact[];
  current: Contact | null;
  filtered: Contact[] | null;
  error: any;
  loading: boolean;
  skills: Skill[];
}
