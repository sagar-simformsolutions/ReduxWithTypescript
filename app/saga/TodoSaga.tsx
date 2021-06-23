import { put, takeLatest } from 'redux-saga/effects';
import { TodoActions, TodoTypes } from '@redux';

type ResponseType = {
  status: number;
  data: string;
};

type AddTodoRequestType = {
  request: string;
};

function* manageResponse(
  response: ResponseType,
  success: (data: string) => any,
  failure: (error: string | null) => any
) {
  if (response.status === 200) {
    yield put(success(response.data));
  } else {
    yield put(failure('Failed'));
  }
}

export function* addTodo({ request }: ReturnType<(request: AddTodoRequestType) => any>) {
  const response: ResponseType = { status: 200, data: request };

  yield* manageResponse(response, TodoActions.addTodoSuccess, TodoActions.addTodoFailure);
}

export default [takeLatest(TodoTypes.ADD_TODO_REQUEST, addTodo)];

/*

if function has more arguments
export function* addTodo({ request }: ReturnType<(request: AddTodoRequestType, ...args: any[]) => any>) {
  const response: ResponseType = { status: 200, data: request };

  yield* manageResponse(response, TodoActions.addTodoSuccess, TodoActions.addTodoFailure);
}
*/
