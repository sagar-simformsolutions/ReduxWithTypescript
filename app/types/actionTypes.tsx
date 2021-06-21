// For Action Creator

export interface AddTodo {
  type: 'ADD_TODO_SUCCESS';
  data: {
    response: Array<any>;
  };
  error: string;
}
