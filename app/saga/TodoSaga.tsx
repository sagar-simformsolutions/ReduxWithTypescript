import {put, takeLatest} from 'redux-saga/effects';
import AddTodoActions, {AddTodoTypes} from '../redux/TodoRedux';

function* manageResponse(response: any, success: Function, failure: Function) {
  if (response?.status === 200) {
    yield put(success(response.data));
  } else {
    yield put(failure('Failed'));
  }
}

export function* addTodo(api: any, action: any) {
  const response = {status: 200, data: action.payload};

  yield* manageResponse(
    response,
    AddTodoActions.addTodoSuccess,
    AddTodoActions.addTodoFailure,
  );
}

export default [takeLatest(AddTodoTypes.ADD_TODO_REQUEST, addTodo, '')];
