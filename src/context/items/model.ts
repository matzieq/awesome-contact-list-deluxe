export interface Skill {
  _id: number | string;
  name: string;
}

export interface Item {
  _id: number | string;
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
  items: Item[];
  current: Item | null;
  filtered: Item[] | null;
  error: any;
  loading: boolean;
  skills: Skill[];
}
