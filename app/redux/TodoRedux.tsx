import {createActions, createReducer, DefaultActionTypes} from 'reduxsauce';
import Immutable, {ImmutableObject} from 'seamless-immutable';
import {RootStateType} from '../modules/App';
import {initialStoreType} from '../types/storeType';

type ActionsType = {
  addTodoRequest: (payload: string) => void;
  addTodoSuccess: (data: Object) => void;
  addTodoFailure: (error: string) => void;
};
/* ------------- Types and Action Creators ------------- */
const {Types, Creators} = createActions<DefaultActionTypes, ActionsType>({
  addTodoRequest: ['payload'],
  addTodoSuccess: ['data'],
  addTodoFailure: ['error'],
});

export const AddTodoTypes = Types;
const AddTodoActions = Creators;
export default AddTodoActions;

/* ------------- Initial State ------------- */
export const INITIAL_STATE: ImmutableObject<initialStoreType> = Immutable({
  todoList: [],
  error: null,
});
type SelectorsType = {
  todoList: (state: RootStateType) => string[];
  error: (state: RootStateType) => string | null;
};

/* ------------- Selectors ------------ */
export const AddTodosSelectors: SelectorsType = {
  todoList: (state: RootStateType) => state.todo.todoList,
  error: (state: RootStateType) => state.todo.error,
};

export const request = (
  state: ImmutableObject<initialStoreType>,
): ImmutableObject<initialStoreType> => {
  return state.merge({
    error: null,
  });
};

export const failure = (
  state: ImmutableObject<initialStoreType>,
  {error}: {error: string | null},
): ImmutableObject<initialStoreType> => {
  return state.merge({
    error: error,
  });
};

export const addTodoSuccess = (
  state: ImmutableObject<initialStoreType>,
  {
    data,
  }: {
    data: string[];
  },
): ImmutableObject<initialStoreType> => {
  return state.merge({
    todoList: [...state.todoList, data],
  });
};

export const AddTodoReducer = createReducer<
  ImmutableObject<initialStoreType>,
  {type: any; data?: Object; error?: string | null; payload?: string}
>(INITIAL_STATE, {
  [Types.ADD_TODO_REQUEST]: request,
  [Types.ADD_TODO_SUCCESS]: addTodoSuccess,
  [Types.ADD_TODO_FAILURE]: failure,
});
