import { combineReducers } from 'redux';
import { todoReducer } from './TodoRedux';

export { TodoTypes, TodoActions, TodoSelectors } from './TodoRedux';

export default combineReducers({
  todo: todoReducer
});
