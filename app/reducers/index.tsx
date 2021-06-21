import {combineReducers} from 'redux';

import todoReducer from './todoReducers';

const store = {
  todos: todoReducer,
};

export default combineReducers(store);
