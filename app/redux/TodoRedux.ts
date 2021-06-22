import Immutable, { ImmutableObject } from 'seamless-immutable';
import type { DefaultActionTypes } from 'reduxsauce';
import { createActions, createReducer } from 'reduxsauce';
import type { RootStateType } from '../Store';
import { Action } from 'redux';

/* ------------- Initial State ------------- */

export type TodoType = {
  data: string;
  status: string;
};

export type TodoStateType = {
  todoList: TodoType[];
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
  changeTodoStatus: (request: string) => void;
};

const { Types, Creators } = createActions<DefaultActionTypes, TodoActionsType>({
  addTodoRequest: ['request'],
  addTodoSuccess: ['data'],
  addTodoFailure: ['error'],
  changeTodoStatus: ['request']
});

export const TodoTypes = Types;
export const TodoActions: TodoActionsType = Creators;

/* ------------- Selectors ------------- */
type TodoSelectorsType = {
  getTodoList: (state: RootStateType) => TodoType[];
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
function requestCall(
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
  return state.merge({
    todoList: [
      ...state.todoList,
      {
        status: 'open',
        data: data
      }
    ]
  });
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

export type ChangeTodoSuccessType = {
  request: string;
};

function changeStatus(
  state: ImmutableObject<TodoStateType>,
  { request }: ChangeTodoSuccessType
): ImmutableObject<TodoStateType> {
  const changedArray = state.todoList.map((elements) => {
    const { data } = elements;
    if (data === request) {
      return {
        ...elements,
        status: 'closed'
      };
    }
    return elements;
  });

  return state.merge({
    todoList: changedArray
  });
}

/* ------------- Hookup Reducers To Types ------------- */
export const todoReducer = createReducer<
  ImmutableObject<TodoStateType>,
  Action<{ todoList: any; error?: string | null }>
>(INITIAL_STATE, {
  [TodoTypes.ADD_TODO_REQUEST]: requestCall,
  [TodoTypes.ADD_TODO_SUCCESS]: addTodoSuccess,
  [TodoTypes.ADD_TODO_FAILURE]: addTodoFailure,
  [TodoTypes.CHANGE_TODO_STATUS]: changeStatus
});
