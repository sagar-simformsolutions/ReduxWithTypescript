import { combineReducers } from 'redux';
import { todoReducer } from './TodoRedux';

export {
  TodoTypes,
  TodoActions,
  TodoSelectors,
  AddTodoRequestType,
  AddTodoSuccessType,
  AddTodoFailureType
} from './TodoRedux';

export default combineReducers({
  todo: todoReducer
});
