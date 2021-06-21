export interface reducerStoreType {
  error: string;
  todoList: Array<any>;
  merge: Function;
}

export interface initialStoreType {
  todoList: string[];
  error: string | null;
}
