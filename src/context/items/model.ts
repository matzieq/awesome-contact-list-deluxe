export interface Tag {
  _id: number | string;
  name: string;
}

export interface Item {
  _id: number | string;
  name: string;
  platform: string;
  dateAdded: Date;
  tags: Tag[];
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
  tags: Tag[];
}
