import {combineReducers} from 'redux';
import {AddTodoReducer} from './TodoRedux';

export default combineReducers({
  todo: AddTodoReducer,
});
