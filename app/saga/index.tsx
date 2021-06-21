import { all } from 'redux-saga/effects';
import TodoSaga from './TodoSaga';

export default function* rootSaga() {
  yield all([...TodoSaga]);
}
