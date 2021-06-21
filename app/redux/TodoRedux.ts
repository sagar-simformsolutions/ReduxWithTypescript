import Immutable, { ImmutableObject } from 'seamless-immutable';
import type { DefaultActionTypes } from 'reduxsauce';
import { createActions, createReducer } from 'reduxsauce';
import type { RootStateType } from '../Store';

/* ------------- Initial State ------------- */
export type TodoStateType = {
  todoList: string[];
  error: string | null;
};

export const INITIAL_STATE: ImmutableObject<TodoStateType> = Immutable<TodoStateType>({
  todoList: [],
  error: null
});

/* ------------- Types and Action Creators ------------- */
type TodoActionsType = {
  addTodoRequest: (request: string) => void;
  addTodoSuccess: (data: string) => void;
  addTodoFailure: (error: string | null) => void;
};

const { Types, Creators } = createActions<DefaultActionTypes, TodoActionsType>({
  addTodoRequest: ['request'],
  addTodoSuccess: ['data'],
  addTodoFailure: ['error']
});

export const TodoTypes = Types;
export const TodoActions: TodoActionsType = Creators;

/* ------------- Selectors ------------- */
type TodoSelectorsType = {
  getTodoList: (state: RootStateType) => string[];
  getError: (state: RootStateType) => string | null;
};

export const TodoSelectors: TodoSelectorsType = {
  getTodoList: (state: RootStateType) => state.todo.todoList,
  getError: (state: RootStateType) => state.todo.error
};

/* ------------- Reducers ------------- */
export type AddTodoRequestType = {
  request: string;
};
function addTodoRequest(
  state: ImmutableObject<TodoStateType>,
  { request }: AddTodoRequestType
): ImmutableObject<TodoStateType> {
  return state.merge({ error: null });
}

export type AddTodoSuccessType = {
  data: string;
};
function addTodoSuccess(
  state: ImmutableObject<TodoStateType>,
  { data }: AddTodoSuccessType
): ImmutableObject<TodoStateType> {
  return state.merge({ todoList: [...state.todoList, data] });
}

export type AddTodoFailureType = {
  error: string | null;
};
function addTodoFailure(
  state: ImmutableObject<TodoStateType>,
  { error }: AddTodoFailureType
): ImmutableObject<TodoStateType> {
  return state.merge({ error });
}

/* ------------- Hookup Reducers To Types ------------- */
export const todoReducer = createReducer<ImmutableObject<TodoStateType>, { type: any; theme?: ThemeStateType }>(
  INITIAL_STATE,
  {
    [TodoTypes.ADD_TODO_REQUEST]: addTodoRequest,
    [TodoTypes.ADD_TODO_SUCCESS]: addTodoSuccess,
    [TodoTypes.ADD_TODO_FAILURE]: addTodoFailure
  }
);
