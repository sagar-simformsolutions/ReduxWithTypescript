import { put, takeLatest } from 'redux-saga/effects';
import { TodoTypes, TodoActions, AddTodoRequestType } from '../redux';

type ResponseType = {
  status: number;
  data: string;
};

function* manageResponse(
  response: ResponseType,
  success: (data: string) => void,
  failure: (error: string | null) => void
) {
  if (response.status === 200) {
    yield put(success(response.data));
  } else {
    yield put(failure('Failed'));
  }
}

export function* addTodo({ request }: AddTodoRequestType) {
  const response: ResponseType = { status: 200, data: request };

  yield* manageResponse(response, TodoActions.addTodoSuccess, TodoActions.addTodoFailure);
}

export default [takeLatest(TodoTypes.ADD_TODO_REQUEST, addTodo)];
